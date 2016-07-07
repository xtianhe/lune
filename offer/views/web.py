import os
import sys
import commands
import json
from flask import Blueprint, request, render_template
import time
import threadpool

web_view = Blueprint('web_view', __name__)
channelsList = []
tag = ''
verName = ''
channels = ''
cpath = '/data/pack/channels.txt'
lpath = '/data/pack/log.txt'

@web_view.route('/pkg/')
def index():
    global tag, verName, channels
    verName = '2.12.16'
    channels = ['axm']
    return render_template('pkg/index.html', tag=tag, verName=verName, channels=channels)

@web_view.route('/api/pkg', methods=['POST'])
def api_pkg():
    global channelsList, tag, verName, channels

    channels = request.form.getlist("channels") or ''
    channels = [s.lower() for s in channels]
    print channels
    if os.path.exists(cpath):
        print 'file has been exists'
        fileobj = open(cpath)
        try:
            channels = fileobj.read()
            channelsList = channels.split();
            print channelsList
        finally:
             fileobj.close()
        return ''
    else:
        print 'flie is not exists'
        tag = request.form.get("tag")
        verName = request.form.get("versionName")
        outfolder = "/data/pack/patio/static/packages/"+getParentV(verName)+"/"+verName+"/"
        if not os.path.exists(outfolder):
            os.mkdir(outfolder)
        channels = request.form.get("channels").lower() or ''
        channelsList = channels.split()
        out = open(cpath,'w')
        out.write(channels+'\r\n')
        out.close()
        ospkg(outfolder, tag, verName, cpath)
        return tag

def ospkg(outfolder, tag, verName, cpath):
    command = '/data/pack/pkg.sh -t '+ tag +' -v '+ verName +' -C '+ cpath +' -d '+ outfolder +' > '+ lpath
    print 'thread start'
    pool = threadpool.ThreadPool(1)
    reqs = threadpool.makeRequests(pkgsys, [command])
    [pool.putRequest(req) for req in reqs]
    #pool.wait()

def pkgsys(command):
    print command
    os.system(command)

@web_view.route('/api/pkgStatus', methods=['POST'])
def api_pkg_status():
    global channelsList
    global verName
    ok = False
    message = 'loading'
    curChannel = []
    verNameTemp = verName
    if os.path.exists(cpath) and os.path.exists(lpath):
        with open(lpath) as foo:
            for line in foo.readlines():
                for channel in channelsList:
                    a = ':app:assemble'+channel.capitalize()+'Release'
                    if a in line:
                        curChannel.append(channel);
                if ":app:assembleRelease" in line:
                    ok = True
                    message = 'finish'
                    dpath = "/data/pack/patio/static/packages/"+getParentV(verName)+"/"+verName
                    createPack(dpath)
                    deletedCache()
    else:
        ok = True
        message = 'no file'
        deletedCache()
    print curChannel
    return json.dumps({'ok': ok, 'message':message, 'curChannel':curChannel, 'verName':verNameTemp})

def getParentV(verName):
    strs = verName.split('.')
    return strs[0]+'.'+strs[1]

def createPack(dpath):
    os.system("find "+ dpath +" -type f | grep -v pack.json | xargs md5sum > "+ dpath +"/pack.json")

@web_view.route('/api/stopPKG', methods=['POST'])
def api_stop_pkg():
    os.system("ps aux | grep pkg.sh | grep -v grep | awk '{print $2}' | xargs kill -9")
    deletedCache()
    return 'ok'

def deletedCache():
    global tag, verName, channels
    tag = ''
    verName = ''
    channels = ''
    if os.path.exists(cpath):
        os.remove(cpath);
        print 'deleted '+cpath
    if os.path.exists(lpath):
        os.remove(lpath);
        print 'deleted '+lpath



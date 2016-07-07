# -*- coding: utf-8 -*-


from PIL import Image, ImageFont, ImageDraw
from flask import Blueprint, Flask, request, render_template
import os
import sys
import json
import random
import time

class Acceptance(object):

    def __init__(self, fontpath):
        self.fontpath = fontpath
        self.cupper = ["〇", "一", "二", "三", "四",
                       "五", "六", "七", "八", "九"]

    def to_unicode(self, string):
        if isinstance(string, str):
            return string.decode("utf-8")
        return string

    def cyear(self, year):
        cyear = "".join([self.cupper[int(x)] for x in year])
        return self.to_unicode(cyear)

    def get(self, filepath, username, year, fill='#000'):
        im = Image.open(filepath)
        draw = ImageDraw.Draw(im)
        font = ImageFont.truetype(self.fontpath, 48)
        draw.text((190, 730), self.to_unicode(username), font=font, fill=fill)
        font = ImageFont.truetype(self.fontpath, 38)
        draw.text((330, 1045), self.cyear(year), font=font, fill=fill)
        font = ImageFont.truetype(self.fontpath, 42)
        draw.text((710, 1485), year, font=font, fill=fill)
        draw.text((910, 1485), u"7", font=font, fill=fill)
        draw.text((1055, 1485), u"2", font=font, fill=fill)
        return im

    def save(self, im, filepath):
        im = im.resize((600, 784))
        return im.save(filepath, "JPEG", quality=85)

offer = Blueprint('offer', __name__)

@offer.route('/offer/')
def index():
    return render_template('index.html')

@offer.route('/get_img', methods=['POST'])
def get_img():
    name = request.form.get("name")
    year = request.form.get("year")
    school = request.form.get("school")
    school = get_school(school)
    imgUrl = "/static/temp/%s.jpg" % int(time.time() * 1000)
    accept = Acceptance(u"./fonts/华文细黑.ttf")
    im = accept.get("./school/"+school+".jpg", name, year)
    accept.save(im, "."+imgUrl)
    return json.dumps({'school':school, 'imgUrl':imgUrl})

def get_school(school):
    if school:
        return school
    else:
        schools = [u"北京大学",u"中央美术学院",u"南京大学",u"中国石油大学",u"北京协和医学院",u"山东大学",u"哈尔滨工业大学",u"浙江大学",u"北京航空航天大学",u"中南大学",u"西安建筑科技大学",u"北京交通大学",u"国防大学",u"中国地质大学",u"中央音乐学院",u"天津科技大学",u"青岛科技大学",u"四川大学",u"清华大学",u"南京林业大学",u"景德镇陶瓷学院",u"湖南工业大学",u"东华大学",u"天津工业大学",u"北京服装学院",u"苏州大学",u"武汉纺织大学",u"北京体育学院",u"中国农业大学",u"华南理工大学",u"华中农业大学",u"西安理工大学",u"江南大学",u"云南农业大学",u"中国传媒大学",u"中国人民大学",u"同济大学",u"北京邮电大学",u"对外经济贸易大学",u"上海交通大学",u"北京师范大学",u"电子科技大学",u"新东方烹饪学校",u"北京林业大学",u"中国政法大学",u"股票大学",u"中国佛学院",u"清洁工大学",u"女神学校",u"拆迁大学",u"蓝翔高级技工学校",u"暴风城联盟大学",u"复仇者联盟大学",u"钉子户大学",u"保镖学校",u"奥格瑞玛部落大学",u"好莱坞电影大学",u"屌丝培训学校",u"北方汽车专修学校",u"少林寺",u"淑女培训学校",u"猛男培训学校",u"万通汽修学院",u"睡懒觉大学",u"新华电脑学校",u"福建西山文武学校",u"前端科技大学"]
        return schools[random.randint(0,66)]


def create_app(debug=True):
    global offer
    app = Flask(__name__, template_folder="")
    app.register_blueprint(offer)
    app.debug = debug
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=8640)
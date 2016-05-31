/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.mangui.hls.model {
    import org.mangui.hls.utils.PTS;
    import org.mangui.hls.utils.AES;
    import org.mangui.hls.flv.FLVTag;

    import flash.utils.ByteArray;

    /** Fragment Data. **/
    public class FragmentData {
        /** valid fragment **/
        public var valid : Boolean;
        /** fragment byte array **/
        public var bytes : ByteArray;
        /** bytes Loaded **/
        public var bytesLoaded : int;
        /** AES decryption instance **/
        public var decryptAES : AES;
        /** Start PTS of this chunk. **/
        public var pts_start : Number;
        /** computed Start PTS of this chunk. **/
        public var pts_start_computed : Number;
        /** min/max audio/video PTS of this chunk. **/
        public var pts_min_audio : Number;
        public var pts_max_audio : Number;
        public var pts_min_video : Number;
        public var pts_max_video : Number;
        /** audio/video found ? */
        public var audio_found : Boolean;
        public var video_found : Boolean;
        /** tag related stuff */
        public var metadata_tag_injected : Boolean;
        private var tags_pts_min_audio : Number;
        private var tags_pts_max_audio : Number;
        private var tags_pts_min_video : Number;
        private var tags_pts_max_video : Number;
        private var tags_audio_found : Boolean;
        private var tags_video_found : Boolean;
        public var tags : Vector.<FLVTag>;
        /* video dimension */
        public var video_width : int;
        public var video_height : int;

        /** Fragment metrics **/
        public function FragmentData() {
            this.pts_start = NaN;
            this.pts_start_computed = NaN;
            this.valid = true;
            this.video_width = 0;
            this.video_height = 0;
        };

        public function appendTags(tags : Vector.<FLVTag>) : void {
            // Audio PTS/DTS normalization + min/max computation
            for each (var tag : FLVTag in tags) {
                tag.pts = PTS.normalize(pts_start_computed, tag.pts);
                tag.dts = PTS.normalize(pts_start_computed, tag.dts);
                switch( tag.type ) {
                    case FLVTag.AAC_RAW:
                    case FLVTag.AAC_HEADER:
                    case FLVTag.MP3_RAW:
                        audio_found = true;
                        tags_audio_found = true;
                        tags_pts_min_audio = Math.min(tags_pts_min_audio, tag.pts);
                        tags_pts_max_audio = Math.max(tags_pts_max_audio, tag.pts);
                        pts_min_audio = Math.min(pts_min_audio, tag.pts);
                        pts_max_audio = Math.max(pts_max_audio, tag.pts);
                        break;
                    case FLVTag.AVC_HEADER:
                    case FLVTag.AVC_NALU:
                        video_found = true;
                        tags_video_found = true;
                        tags_pts_min_video = Math.min(tags_pts_min_video, tag.pts);
                        tags_pts_max_video = Math.max(tags_pts_max_video, tag.pts);
                        pts_min_video = Math.min(pts_min_video, tag.pts);
                        pts_max_video = Math.max(pts_max_video, tag.pts);
                        break;
                    case FLVTag.DISCONTINUITY:
                    case FLVTag.METADATA:
                    default:
                        break;
                }
                this.tags.push(tag);
            }
        }

        public function flushTags() : void {
            // clean-up tags
            tags = new Vector.<FLVTag>();
            tags_audio_found = tags_video_found = false;
            metadata_tag_injected = false;
            pts_min_audio = pts_min_video = tags_pts_min_audio = tags_pts_min_video = Number.POSITIVE_INFINITY;
            pts_max_audio = pts_max_video = tags_pts_max_audio = tags_pts_max_video = Number.NEGATIVE_INFINITY;
        }

        public function shiftTags() : void {
            tags = new Vector.<FLVTag>();
            if (tags_audio_found) {
                tags_pts_min_audio = tags_pts_max_audio;
                tags_audio_found = false;
            }
            if (tags_video_found) {
                tags_pts_min_video = tags_pts_max_video;
                tags_video_found = false;
            }
        }

        public function get pts_min() : Number {
            if (audio_found) {
                return pts_min_audio;
            } else {
                return pts_min_video;
            }
        }

        public function get pts_max() : Number {
            if (audio_found) {
                return pts_max_audio;
            } else {
                return pts_max_video;
            }
        }

        public function get tag_pts_min() : Number {
            if (audio_found) {
                return tags_pts_min_audio;
            } else {
                return tags_pts_min_video;
            }
        }

        public function get tag_pts_max() : Number {
            if (audio_found) {
                return tags_pts_max_audio;
            } else {
                return tags_pts_max_video;
            }
        }

        public function get tag_pts_start_offset() : Number {
            if (tags_audio_found) {
                return tags_pts_min_audio - pts_min_audio;
            } else {
                return tags_pts_min_video - pts_min_video;
            }
        }

        public function get tag_pts_end_offset() : Number {
            if (tags_audio_found) {
                return tags_pts_max_audio - pts_min_audio;
            } else {
                return tags_pts_max_video - pts_min_video;
            }
        }
    }
}
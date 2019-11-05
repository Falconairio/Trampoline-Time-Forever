'use strict';

function Trampoline(canvas, mDownX, mDownY, mUpX, mUpY,difficulty) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
    if(difficulty === 0) {
        if(mDownX > mUpX) {
            this.sizewidth = mDownX - mUpX; 
            this.x = mUpX - 50;
        } else {
            this.sizewidth = mUpX - mDownX;
            this.x = mDownX - 50 ;
        }
        if(mDownY > mUpY) {
            this.sizeheight = mDownY - mUpY;
            if(this.sizeheight > 50) {
                this.sizeheight = 50;
            }
            this.y = mUpY;
        } else {
            this.sizeheight = mUpY - mDownY;
            if(this.sizeheight > 30) {
                this.sizeheight = 30;
            }
            this.y = mDownY;
        }
    } else if(difficulty === 1) {
        if(mDownX > mUpX) {
            this.sizewidth = mDownX - mUpX; 
            if(this.sizewidth > 400) {
                this.sizewidth = 400;
            }
            this.x = mUpX - 50;
        } else {
            this.sizewidth = mUpX - mDownX;
            if(this.sizewidth > 400) {
                this.sizewidth = 400;
            }
            this.x = mDownX - 50 ;
        }
        if(mDownY > mUpY) {
            this.sizeheight = mDownY - mUpY;
            if(this.sizeheight > 50) {
                this.sizeheight = 50;
            }
            this.y = mUpY;
        } else {
            this.sizeheight = mUpY - mDownY;
            if(this.sizeheight > 30) {
                this.sizeheight = 30;
            }
            this.y = mDownY;
        }
    } else {
        if(mDownX > mUpX) {
            this.sizewidth = mDownX - mUpX; 
            if(this.sizewidth > 100) {
                this.sizewidth = 100;
            }
            this.x = mUpX - 50;
        } else {
            this.sizewidth = mUpX - mDownX;
            if(this.sizewidth > 100) {
                this.sizewidth = 100;
            }
            this.x = mDownX - 50 ;
        }
        if(mDownY > mUpY) {
            this.sizeheight = mDownY - mUpY;
            if(this.sizeheight > 50) {
                this.sizeheight = 50;
            }
            this.y = mUpY;
        } else {
            this.sizeheight = mUpY - mDownY;
            if(this.sizeheight > 30) {
                this.sizeheight = 30;
            }
            this.y = mDownY;
        }
    }
}




Trampoline.prototype.draw = function() {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(this.x,this.y,this.sizewidth,this.sizeheight);
};
Trampoline.prototype.fill = function() {
    this.ctx.fillStyle = "white";
}
/**
 * Created by lyk on 2018/5/15 0015.
 */
$(document).ready(function(){


// 特征点的集成
var leftEye = [
    "left_eye_center", // "left_eye_pupil",
    "left_eye_left_corner",
    "left_eye_right_corner",
    "left_eye_upper_left_quarter",
    "left_eye_top",
    "left_eye_upper_right_quarter",
    "left_eye_lower_left_quarter",
    "left_eye_bottom",
    "left_eye_lower_right_quarter"
];
var rightEye = [
    "right_eye_center", // "right_eye_pupil",
    "right_eye_right_corner",
    "right_eye_left_corner",
    "right_eye_upper_right_quarter",
    "right_eye_top",
    "right_eye_upper_left_quarter",
    "right_eye_lower_right_quarter",
    "right_eye_bottom",
    "right_eye_lower_left_quarter"
];
var leftEyeBrow = [
    "left_eyebrow_left_corner",
    "left_eyebrow_upper_left_quarter",
    "left_eyebrow_upper_middle",
    "left_eyebrow_upper_right_quarter",
    "left_eyebrow_upper_right_corner",
    "left_eyebrow_lower_left_quarter",
    "left_eyebrow_lower_middle",
    "left_eyebrow_lower_right_quarter",
    "left_eyebrow_lower_right_corner"
];
var rightEyeBrow = [
    "right_eyebrow_right_corner",
    "right_eyebrow_upper_right_quarter",
    "right_eyebrow_upper_middle",
    "right_eyebrow_upper_left_quarter",
    "right_eyebrow_upper_left_corner",
    "right_eyebrow_lower_right_quarter",
    "right_eyebrow_lower_middle",
    "right_eyebrow_lower_left_quarter",
    "right_eyebrow_lower_left_corner"
];
var mouth = [
    "mouth_left_corner",
    "mouth_upper_lip_left_contour2",
    "mouth_upper_lip_left_contour1",
    "mouth_upper_lip_top",
    "mouth_upper_lip_right_contour1",
    "mouth_upper_lip_right_contour2",
    "mouth_upper_lip_left_contour3",
    "mouth_upper_lip_left_contour4",
    "mouth_upper_lip_right_contour4",
    "mouth_upper_lip_right_contour3",
    "mouth_lower_lip_left_contour1",
    "mouth_lower_lip_top",
    "mouth_lower_lip_right_contour1",
    "mouth_lower_lip_left_contour2",
    "mouth_lower_lip_left_contour3",
    "mouth_lower_lip_bottom",
    "mouth_lower_lip_right_contour3",
    "mouth_lower_lip_right_contour2",
    "mouth_right_corner"
];

// iterator variable
var i;

var contour = [];
for ( i=0; i<16; i++ ) {
    contour.push("contour_left"+i);
    contour.push("contour_right"+i);
}
contour.push("contour_chin");

/***************************************************
 * js 动态生成控制面板
 * @type {Array}
 ***************************************************/



/***************************************************
 * 获取所有必要的特征点名称
 * @type {Array}
 ***************************************************/

// 所有关键点
var all_features = [];
// contour chin
all_features.push("contour_chin");
// left contour
for ( i=1; i<=16; i++ ) {
    all_features.push("contour_left" + i);
}
// right contour
for ( i=1; i<=16; i++ ) {
    all_features.push("contour_right" + i);
}
// left eye brow
all_features = all_features.concat(leftEyeBrow);
// right eye brow
all_features = all_features.concat(rightEyeBrow);
// left eye
all_features = all_features.concat(leftEye);
// right eye
all_features = all_features.concat(rightEye);
// nose middle contour
all_features.push("nose_middle_contour");
// left nose contour
for ( i=1; i<=5; i++ ) {
    all_features.push("nose_left_contour" + i);
}
// right nose contour
for ( i=1; i<=5; i++ ) {
    all_features.push("nose_right_contour" + i);
}
// nose bridge
for ( i=1; i<=3; i++ ) {
    all_features.push("nose_bridge" + i);
}
// nose tip
all_features.push("nose_tip");
// mouse
all_features = all_features.concat(mouth);


/***************************************************
 * 人脸特征字段的对称字段
 * @type {Array}
 ***************************************************/
var all_features_symtery = [];
for ( i=0; i<all_features.length; i++ ) {
    all_features_symtery[i] = [];
}
// 轮廓
all_features_symtery[0]["flag"] = false;
all_features_symtery[0]["sym"] = null;
for ( i=1; i<=16; i++ ) {
    all_features_symtery[i]["flag"] = true;
    all_features_symtery[i]["sym"] = all_features[i+16];
}
for ( i=1; i<=16; i++ ) {
    all_features_symtery[i+16]["flag"] = true;
    all_features_symtery[i+16]["sym"] = all_features[i];
}
// 眉毛
for ( i=33; i<42; i++ ) {
    all_features_symtery[i]["flag"] = true;
    all_features_symtery[i]["sym"] = all_features[i+9];
}
for ( i=33; i<42; i++ ) {
    all_features_symtery[i+9]["flag"] = true;
    all_features_symtery[i+9]["sym"] = all_features[i];
}
// 眼睛
for ( i=51; i<60; i++ ) {
    all_features_symtery[i]["flag"] = true;
    all_features_symtery[i]["sym"] = all_features[i+9];
}
for ( i=51; i<60; i++ ) {
    all_features_symtery[i+9]["flag"] = true;
    all_features_symtery[i+9]["sym"] = all_features[i];
}
// 鼻子
all_features_symtery[69]["flag"] = false;
all_features_symtery[69]["sym"] = null;
for ( i=70; i<75; i++ ) {
    all_features_symtery[i]["flag"] = true;
    all_features_symtery[i]["sym"] = all_features[i+5];
}
for ( i=70; i<75; i++ ) {
    all_features_symtery[i+5]["flag"] = true;
    all_features_symtery[i+5]["sym"] = all_features[i];
}
for ( i=80; i<84; i++ ) {
    all_features_symtery[i]["flag"] = false;
    all_features_symtery[i]["sym"] = null;
}
// 嘴巴
all_features_symtery[84]["flag"] = true;
all_features_symtery[84]["sym"] = all_features[102];
// 嘴巴上嘴唇上侧
for ( i=0; i<2; i++ ) {
    all_features_symtery[85+i]["flag"] = true;
    all_features_symtery[85+i]["sym"] = all_features[85+4-i];
}
all_features_symtery[87]["flag"] = false;
all_features_symtery[87]["sym"] = null;
for ( i=0; i<2; i++ ) {
    all_features_symtery[85+4-i]["flag"] = true;
    all_features_symtery[85+4-i]["sym"] = all_features[85+i];
}
// 嘴巴上嘴唇下侧
for ( i=0; i<2; i++ ) {
    all_features_symtery[90+i]["flag"] = true;
    all_features_symtery[90+i]["sym"] = all_features[90+3-i];
}
for ( i=0; i<2; i++ ) {
    all_features_symtery[90+3-i]["flag"] = true;
    all_features_symtery[90+3-i]["sym"] = all_features[90+i];
}
// 嘴巴下嘴唇上侧
all_features_symtery[94]["flag"] = true;
all_features_symtery[94]["sym"] = all_features[96];
all_features_symtery[95]["flag"] = false;
all_features_symtery[95]["sym"] = null;
all_features_symtery[96]["flag"] = true;
all_features_symtery[96]["sym"] = all_features[94];
// 嘴巴下嘴唇下侧
for ( i=0; i<2; i++ ) {
    all_features_symtery[97+i]["flag"] = true;
    all_features_symtery[97+i]["sym"] = all_features[97+4-i];
}
all_features_symtery[99]["flag"] = false;
all_features_symtery[99]["sym"] = null;
for ( i=0; i<2; i++ ) {
    all_features_symtery[97+4-i]["flag"] = true;
    all_features_symtery[97+4-i]["sym"] = all_features[97+i];
}
all_features_symtery[102]["flag"] = true;
all_features_symtery[102]["sym"] = all_features[84];


/***************************************************
 * 所有特征点的描述信息
 * @type {Array}
 ***************************************************/
var descriptionArr = [
    // 下巴特征
    ["contour_chin", "下巴特征点"], // 0

    // 左脸轮廓
    ["contour_left1", "左脸轮廓自上而下第 1 个特征点"], // 1
    ["contour_left2", "左脸轮廓自上而下第 2 个特征点"],
    ["contour_left3", "左脸轮廓自上而下第 3 个特征点"],
    ["contour_left4", "左脸轮廓自上而下第 4 个特征点"],
    ["contour_left5", "左脸轮廓自上而下第 5 个特征点"],
    ["contour_left6", "左脸轮廓自上而下第 6 个特征点"],
    ["contour_left7", "左脸轮廓自上而下第 7 个特征点"],
    ["contour_left8", "左脸轮廓自上而下第 8 个特征点"],
    ["contour_left9", "左脸轮廓自上而下第 9 个特征点"],
    ["contour_left10", "左脸轮廓自上而下第 10 个特征点"],
    ["contour_left11", "左脸轮廓自上而下第 11 个特征点"],
    ["contour_left12", "左脸轮廓自上而下第 12 个特征点"],
    ["contour_left13", "左脸轮廓自上而下第 13 个特征点"],
    ["contour_left14", "左脸轮廓自上而下第 14 个特征点"],
    ["contour_left15", "左脸轮廓自上而下第 15 个特征点"],
    ["contour_left16", "左脸轮廓自上而下第 16 个特征点"],

    // 右脸轮廓
    ["contour_right1", "右脸轮廓自上而下第 1 个特征点"], // 17
    ["contour_right2", "右脸轮廓自上而下第 2 个特征点"],
    ["contour_right3", "右脸轮廓自上而下第 3 个特征点"],
    ["contour_right4", "右脸轮廓自上而下第 4 个特征点"],
    ["contour_right5", "右脸轮廓自上而下第 5 个特征点"],
    ["contour_right6", "右脸轮廓自上而下第 6 个特征点"],
    ["contour_right7", "右脸轮廓自上而下第 7 个特征点"],
    ["contour_right8", "右脸轮廓自上而下第 8 个特征点"],
    ["contour_right9", "右脸轮廓自上而下第 9 个特征点"],
    ["contour_right10", "右脸轮廓自上而下第 10 个特征点"],
    ["contour_right11", "右脸轮廓自上而下第 11 个特征点"],
    ["contour_right12", "右脸轮廓自上而下第 12 个特征点"],
    ["contour_right13", "右脸轮廓自上而下第 13 个特征点"],
    ["contour_right14", "右脸轮廓自上而下第 14 个特征点"],
    ["contour_right15", "右脸轮廓自上而下第 15 个特征点"],
    ["contour_right16", "右脸轮廓自上而下第 16 个特征点"],

    // 左眉毛
    ["left_eyebrow_left_corner", "左眉毛左侧眉角特征点"], // 33
    ["left_eyebrow_upper_left_quarter", "左眉毛上侧从左到右第 1 个特征点"],
    ["left_eyebrow_upper_middle", "左眉毛上侧从左到右第 2 个特征点"],
    ["left_eyebrow_upper_right_quarter", "左眉毛上侧从左到右第 3 个特征点"],
    ["left_eyebrow_upper_right_corner", "左眉毛上侧从左到右第 4 个特征点"],
    ["left_eyebrow_lower_left_quarter", "左眉毛下侧从左到右第 1 个特征点"],
    ["left_eyebrow_lower_middle", "左眉毛下侧从左到右第 2 个特征点"],
    ["left_eyebrow_lower_right_quarter", "左眉毛下侧从左到右第 3 个特征点"],
    ["left_eyebrow_lower_right_corner", "左眉毛下侧从左到右第 4 个特征点"],

    // 右眉毛
    ["right_eyebrow_right_corner", "右眉毛右侧眉角特征点"], //42
    ["right_eyebrow_upper_right_quarter", "右眉毛上侧从右到左第 1 个特征点"],
    ["right_eyebrow_upper_middle", "右眉毛上侧从右到左第 2 个特征点"],
    ["right_eyebrow_upper_left_quarter", "右眉毛上侧从右到左第 3 个特征点"],
    ["right_eyebrow_upper_left_corner", "右眉毛上侧从右到左第 4 个特征点"],
    ["right_eyebrow_lower_right_quarter", "右眉毛下侧从右到左第 1 个特征点"],
    ["right_eyebrow_lower_middle", "右眉毛下侧从右到左第 2 个特征点"],
    ["right_eyebrow_lower_left_quarter", "右眉毛下侧从右到左第 3 个特征点"],
    ["right_eyebrow_lower_left_corner", "右眉毛下侧从右到左第 4 个特征点"],

    // 左眼
    ["left_eye_center", "左眼睛中心特征点"], // 51
    ["left_eye_left_corner", "左眼睛左侧眼角特征点"],
    ["left_eye_right_corner", "左眼睛右侧眼角特征点"],
    ["left_eye_upper_left_quarter", "左眼睛上侧从左到右第 1 个特征点"],
    ["left_eye_top", "左眼睛上侧从左到右第 2 个特征点"],
    ["left_eye_upper_right_quarter", "左眼睛上侧从左到右第 3 个特征点"],
    ["left_eye_lower_left_quarter", "左眼睛下侧从左到右第 1 个特征点"],
    ["left_eye_bottom", "左眼睛下侧从左到右第 2 个特征点"],
    ["left_eye_lower_right_quarter", "左眼睛下侧从左到右第 3 个特征点"],

    // 右眼
    ["right_eye_center", "右眼睛中心特征点"], //60
    ["right_eye_right_corner", "右眼睛右侧眼角特征点"],
    ["right_eye_left_corner", "右眼睛左侧眼角特征点"],
    ["right_eye_upper_right_quarter", "右眼睛上侧从右到左第 1 个特征点"],
    ["right_eye_top", "右眼睛上侧从右到左第 2 个特征点"],
    ["right_eye_upper_left_quarter", "右眼睛上侧从右到左第 3 个特征点"],
    ["right_eye_lower_right_quarter", "右眼睛下侧从右到左第 1 个特征点"],
    ["right_eye_bottom", "右眼睛下侧从右到左第 2 个特征点"],
    ["right_eye_lower_left_quarter", "右眼睛下侧从右到左第 3 个特征点"],

    // 鼻子中心轮廓
    ["nose_left_contour", "鼻子中心轮廓特征点"], //69

    // 鼻子左侧轮廓
    ["nose_left_contour1", "鼻子左侧轮廓自上而下第 1 个特征点"], //70
    ["nose_left_contour2", "鼻子左侧轮廓自上而下第 2 个特征点"],
    ["nose_left_contour3", "鼻子左侧轮廓自上而下第 3 个特征点"],
    ["nose_left_contour4", "鼻子左侧轮廓自上而下第 4 个特征点"],
    ["nose_left_contour5", "鼻子左侧轮廓自上而下第 5 个特征点"],

    // 鼻子右侧轮廓
    ["nose_right_contour1", "鼻子右侧轮廓自上而下第 1 个特征点"], //75
    ["nose_right_contour2", "鼻子右侧轮廓自上而下第 2 个特征点"],
    ["nose_right_contour3", "鼻子右侧轮廓自上而下第 3 个特征点"],
    ["nose_right_contour4", "鼻子右侧轮廓自上而下第 4 个特征点"],
    ["nose_right_contour5", "鼻子右侧轮廓自上而下第 5 个特征点"],

    // 鼻子鼻梁轮廓
    ["nose_bridge1", "鼻梁轮廓自上而下第 1 个特征点"], // 80
    ["nose_bridge2", "鼻梁轮廓自上而下第 2 个特征点"],
    ["nose_bridge3", "鼻梁轮廓自上而下第 3 个特征点"],

    // 鼻尖
    ["nose_tip", "鼻尖特征点"], //83

    // 嘴巴轮廓
    ["mouth_left_corner", "嘴巴左侧嘴角特征点"], //84

    ["mouth_upper_lip_left_contour2", "嘴巴上嘴唇上侧从左到右第 1 个特征点"], // 85
    ["mouth_upper_lip_left_contour1", "嘴巴上嘴唇上侧从左到右第 2 个特征点"],
    ["mouth_upper_lip_top", "嘴巴上嘴唇上侧从左到右第 3 个特征点，即上嘴唇上侧中心点"],
    ["mouth_upper_lip_right_contour1", "嘴巴上嘴唇上侧从左到右第 4 个特征点"],
    ["mouth_upper_lip_right_contour2", "嘴巴上嘴唇上侧从左到右第 5 个特征点"],

    ["mouth_upper_lip_left_contour3", "嘴巴上嘴唇下侧从左到右第 1 个特征点"], // 90
    ["mouth_upper_lip_left_contour4", "嘴巴上嘴唇下侧从左到右第 2 个特征点（注意，如果嘴唇是闭合的，则其会与下嘴唇上侧从左到右第 1 个特征点重合）"],
    ["mouth_upper_lip_right_contour4", "嘴巴上嘴唇下侧从左到右第 3 个特征点（注意，如果嘴唇是闭合的，则其会与下嘴唇上侧从左到右第 3 个特征点重合）"],
    ["mouth_upper_lip_right_contour3", "嘴巴上嘴唇下侧从左到右第 4 个特征点"],


    ["mouth_lower_lip_left_contour1", "嘴巴下嘴唇上侧从左到右第 1 个特征点（注意，如果嘴唇是闭合的，则其会与上嘴唇下侧从左到右第 2 个特征点重合）"], // 94
    ["mouth_lower_lip_top", "嘴巴下嘴唇上侧从左到右第 2 个特征点，即下嘴唇上侧中心点"],
    ["mouth_lower_lip_right_contour1", "嘴巴上嘴唇下侧从左到右第 3 个特征点（注意，如果嘴唇是闭合的，则其会与上嘴唇下侧从左到右第 3 个特征点重合）"],


    ["mouth_lower_lip_left_contour2", "嘴巴下嘴唇下侧从左到右第 1 个特征点"], // 97
    ["mouth_lower_lip_left_contour3", "嘴巴下嘴唇下侧从左到右第 2 个特征点"],
    ["mouth_lower_lip_bottom", "嘴巴下嘴唇下侧从左到右第 3 个特征点，即下嘴唇下侧中心点"],
    ["mouth_lower_lip_right_contour3", "嘴巴下嘴唇下侧从左到右第 4 个特征点"],
    ["mouth_lower_lip_right_contour2", "嘴巴下嘴唇下侧从左到右第 5 个特征点"],


    ["mouth_right_corner", "嘴巴右侧嘴角特征点"] // 102

];

var baseTip = "No feature points are selected, use the mouse to select on the left";


/*----------------------------------------------------------------------------------------------------*/
/*####################################################################################################*/
/*----------------------------------------------------------------------------------------------------*/



/***************************************************
 * 开始操作
 * @type {Array}
 ***************************************************/

// $("#myModal3").modal("show");
// $("#detailError").html("<font color='#f00'>Draw Face Features Error：</font>Timeout! The network is poor, please try again");

var stickFigureFlag = false, // 是否已经点击了 生成简笔画操作
    prototypePicFlag = false, // 是否已经点击了 生成原型脸操作
    bindingLeftAndRight = true, // 是否 绑定了左右器官对称操作
    ifGenTargetFlag = false; // 是否点击了 生成目标脸操作

var scale; // 缩放比例

var imagePic = "man"; // 默认为男性模板

var whichModel = 0; // 默认为男性模板

var prototypePic; // 存储平均脸图片

var resultJson, // 保存了
    changedJson;

var list = [1, 0, 1, 1, 0]; // star 特征列表

// 基本色
var baseColor = "#0f0",
    selectedColor = "#f00";
var allFeaturesHandle = [], // 所有的特征点
    allFeaturesSymmtery = []; // 记录对称的关键点

var imgSrc;

// 默认男性模板
var imgArea = document.getElementById("imgArea");
var stickFigure = document.getElementById("stickFigure");
var landmark;
// svg 矢量图
var pixSvg = document.getElementById("pixSvg");
var SVG_NS = 'http://www.w3.org/2000/svg';
var svgLeft, svgTop, svgWidth, svgHeight;
svgLeft = $(pixSvg).offset().left;
svgTop = $(pixSvg).offset().top;

console.log("svgLeft : " + svgLeft + " - " + "svgTop : " + svgTop);
console.log("imgLeft : " + $(imgArea).offset().left + " - " + "svgTop : " + $(imgArea).offset().top);

// 隐藏stick figure 图片 展示区域
$("#stickFigure").hide();
$("#loading").hide();
// $("#gen_stick_figure").show();

$(".model_type").eq(0).attr("checked", true);
// jquery labelauty call
$(".dowebok input").labelauty();

imgArea.src = "./pictures/man_1.png";
getFeatures("man_1");

/***************************************************
 * 点击事件
 * @type {Array}
 ***************************************************/

$("#single").click(function() {
    $("#pixSvg path").remove();
    pixSvg.onmousemove = null;
    pixSvg.onmouseup = null;
    addEvents();
});
$("#group").click(function() {
    $(".part").prop("checked", false);
});


$(".part").click(function(){
    let value = $(this).val();
    var left = 500, right = 0, top = 500, bottom = 0;
    if ( value==0 ) {
        left = landmark['contour_left1']['x'];
        right = landmark['contour_right1']['x'];
        top = parseInt(landmark['contour_left1']['y']) < parseInt(landmark['contour_right1']['y']) ? parseInt(landmark['contour_left1']['y']) : parseInt(landmark['contour_right1']['y']);
        bottom = parseInt(landmark['contour_chin']['y']);

        drawRectBox(left, top, right, bottom, 0, 32);
    } else if ( value == 1 ) {
        for( var j=33; j<=41; j ++ ) {
            if ( parseInt(landmark[all_features[j]]['x']) < left ) {
                left = parseInt(landmark[all_features[j]]['x'])
            }
            if ( parseInt(landmark[all_features[j]]['x']) > right ) {
                right = parseInt(landmark[all_features[j]]['x']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) < top ) {
                top = parseInt(landmark[all_features[j]]['y']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) > bottom ) {
                bottom = parseInt(landmark[all_features[j]]['y']);
            }
            console.log(landmark[all_features[j]]['x'] + ":" + landmark[all_features[j]]['y']);
        }
        console.log("left: " + left + "\tright: " + right + "\ttop" + top + "\tbottom" + bottom);
        drawRectBox(left, top, right, bottom, 33, 41);
    } else if ( value == 2 ) {
        for( var j=42; j<=50; j ++ ) {
            if ( parseInt(landmark[all_features[j]]['x']) < left ) {
                left = parseInt(landmark[all_features[j]]['x'])
            }
            if ( parseInt(landmark[all_features[j]]['x']) > right ) {
                right = parseInt(landmark[all_features[j]]['x']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) < top ) {
                top = parseInt(landmark[all_features[j]]['y']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) > bottom ) {
                bottom = parseInt(landmark[all_features[j]]['y']);
            }
        }
        drawRectBox(left, top, right, bottom, 42, 50);
    } else if ( value == 3 ) {
        for( var j=51; j<=59; j ++ ) {
            if ( parseInt(landmark[all_features[j]]['x']) < left ) {
                left = parseInt(landmark[all_features[j]]['x'])
            }
            if ( parseInt(landmark[all_features[j]]['x']) > right ) {
                right = parseInt(landmark[all_features[j]]['x']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) < top ) {
                top = parseInt(landmark[all_features[j]]['y']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) > bottom ) {
                bottom = parseInt(landmark[all_features[j]]['y']);
            }
        }
        drawRectBox(left, top, right, bottom, 51, 59);
    } else if ( value == 4 ) {
        for( var j=60; j<=68; j ++ ) {
            if ( parseInt(landmark[all_features[j]]['x']) < left ) {
                left = parseInt(landmark[all_features[j]]['x'])
            }
            if ( parseInt(landmark[all_features[j]]['x']) > right ) {
                right = parseInt(landmark[all_features[j]]['x']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) < top ) {
                top = parseInt(landmark[all_features[j]]['y']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) > bottom ) {
                bottom = parseInt(landmark[all_features[j]]['y']);
            }
        }
        drawRectBox(left, top, right, bottom, 60, 68);
    } else if ( value == 5 ) {
        for( var j=69; j<=83; j ++ ) {
            if ( parseInt(landmark[all_features[j]]['x']) < left ) {
                left = parseInt(landmark[all_features[j]]['x'])
            }
            if ( parseInt(landmark[all_features[j]]['x']) > right ) {
                right = parseInt(landmark[all_features[j]]['x']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) < top ) {
                top = parseInt(landmark[all_features[j]]['y']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) > bottom ) {
                bottom = parseInt(landmark[all_features[j]]['y']);
            }
        }
        drawRectBox(left, top, right, bottom, 69, 83);
    } else if ( value == 6 ) {
        for( var j=84; j<=102; j ++ ) {
            if ( parseInt(landmark[all_features[j]]['x']) < left ) {
                left = parseInt(landmark[all_features[j]]['x'])
            }
            if ( parseInt(landmark[all_features[j]]['x']) > right ) {
                right = parseInt(landmark[all_features[j]]['x']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) < top ) {
                top = parseInt(landmark[all_features[j]]['y']);
            }
            if ( parseInt(landmark[all_features[j]]['y']) > bottom ) {
                bottom = parseInt(landmark[all_features[j]]['y']);
            }
        }
        drawRectBox(left, top, right, bottom, 84, 102);
    }
});

// 绘制虚线矩形框
function drawRectBox(left, top, right, bottom, start, end) {

    $("#pixSvg path").remove();

    var width = right - left;
    var height = bottom - top;
    var featuresLeftArr = [], featuresRightArr = [], featuresTopArr = [], featuresBottomArr = [];
    for ( var k=0; k<=end-start; k++ ) {
        featuresLeftArr.push(right - parseInt(allFeaturesHandle[k+start].getAttribute("cx")));
        featuresRightArr.push(parseInt(allFeaturesHandle[k+start].getAttribute("cx")) - left);
        featuresTopArr.push(bottom - parseInt(allFeaturesHandle[k+start].getAttribute("cy")));
        featuresBottomArr.push(parseInt(allFeaturesHandle[k+start].getAttribute("cy")) - top);
    }
    // stroke-dasharray: 3;
    var leftPath = document.createElementNS(SVG_NS, "path");
    leftPath.setAttribute("d", "M "+ left + " " + top + " L " + left + " " + bottom);
    leftPath.setAttribute("style", "stroke-width: 2; stroke: #f00; cursor: w-resize");
    var rightPath = document.createElementNS(SVG_NS, "path");
    rightPath.setAttribute("d", "M "+ right + " " + top + " L " + right + " " + bottom);
    rightPath.setAttribute("style", "stroke-width: 2; stroke: #f00; cursor: w-resize");
    var topPath = document.createElementNS(SVG_NS, "path");
    topPath.setAttribute("d", "M "+ left + " " + top + " L " + right + " " + top);
    topPath.setAttribute("style", "stroke-width: 2; stroke: #f00; cursor: s-resize");
    var bottomPath = document.createElementNS(SVG_NS, "path");
    bottomPath.setAttribute("d", "M "+ left + " " + bottom + " L " + right + " " + bottom);
    bottomPath.setAttribute("style", "stroke-width: 2; stroke: #f00; cursor: s-resize");

    pixSvg.appendChild(leftPath);
    pixSvg.appendChild(rightPath);
    pixSvg.appendChild(topPath);
    pixSvg.appendChild(bottomPath);

    var leftFlag = false, rightFlag = false, topFlag = false, bottomFlag = false;

    // onmousedown
    leftPath.onmousedown = function(event) {
        leftFlag = true;
    };
    rightPath.onmousedown = function(event) {
        rightFlag = true;
    };
    topPath.onmousedown = function(event) {
        topFlag = true;
    };
    bottomPath.onmousedown = function(event) {
        bottomFlag = true;
    };
    // onmouseup
    leftPath.onmouseup = function(event) {
        leftFlag = false;
    };
    rightPath.onmouseup = function(event) {
        rightFlag = false;
    };
    topPath.onmouseup = function(event) {
        topFlag = false;
    };
    bottomPath.onmouseup = function(event) {
        bottomFlag = false;
    };
    
    pixSvg.onmousemove = function(event) {
        var coordinate = getMouseCoordinate(event);
        var x = parseInt(coordinate.x) - parseInt(svgLeft); // 确定被拖动点的x值
        var y = parseInt(coordinate.y) - parseInt(svgTop); // 确定被拖动点的y值
        if ( leftFlag && x < right ) {
            leftPath.setAttribute("d", "M "+ x + " " + top + " L " + x + " " + bottom);
            topPath.setAttribute("d", "M "+ x + " " + top + " L " + right + " " + top);
            bottomPath.setAttribute("d", "M "+ x + " " + bottom + " L " + right + " " + bottom);
            for ( var j=start; j<=end; j++ ) {
                allFeaturesHandle[j].setAttribute("cx", Math.floor(right - (right-x)/width*featuresLeftArr[j-start]));
                resultJson[0]['landmark'][all_features[j]]['x'] = Math.floor(right - (right-x)/width*featuresLeftArr[j-start]);
            }
            left = x;
        } else if ( rightFlag && x > left ) {
            rightPath.setAttribute("d", "M "+ x + " " + top + " L " + x + " " + bottom);
            topPath.setAttribute("d", "M "+ left + " " + top + " L " + x + " " + top);
            bottomPath.setAttribute("d", "M "+ left + " " + bottom + " L " + x + " " + bottom);
            for ( var j=start; j<=end; j++ ) {
                allFeaturesHandle[j].setAttribute("cx", Math.floor(left + (x-left)/width*featuresRightArr[j-start]));
                resultJson[0]['landmark'][all_features[j]]['x'] = Math.floor(left + (x-left)/width*featuresRightArr[j-start]);
            }
            right = x;
        } else if ( topFlag && y < bottom) {
            leftPath.setAttribute("d", "M "+ left + " " + y + " L " + left + " " + bottom);
            rightPath.setAttribute("d", "M "+ right + " " + y + " L " + right + " " + bottom);
            topPath.setAttribute("d", "M "+ left + " " + y + " L " + right + " " + y);
            for ( var j=start; j<=end; j++ ) {
                allFeaturesHandle[j].setAttribute("cy", Math.floor(bottom - (bottom-y)/height*featuresTopArr[j-start]));
                resultJson[0]['landmark'][all_features[j]]['y'] = Math.floor(bottom - (bottom-y)/height*featuresTopArr[j-start]);
            }
            top = y;
        } else if ( bottomFlag && y > top ) {
            leftPath.setAttribute("d", "M "+ left + " " + top + " L " + left + " " + y);
            rightPath.setAttribute("d", "M "+ right + " " + top + " L " + right + " " + y);
            bottomPath.setAttribute("d", "M "+ left + " " + y + " L " + right + " " + y);
            for ( var j=start; j<=end; j++ ) {
                allFeaturesHandle[j].setAttribute("cy", Math.floor(top + (y-top)/height*featuresBottomArr[j-start]));
                resultJson[0]['landmark'][all_features[j]]['y'] = Math.floor(top + (y-top)/height*featuresBottomArr[j-start]);
            }
            bottom = y;
        }
    };
    pixSvg.onmouseup = function(event) {
        topFlag = leftFlag = rightFlag = bottomFlag = false;
    }
}

// 从数据库中搜索出相似的人脸
$("#search").click(function() {
    $("#loading").show();
    $.ajax({
        url: "http://localhost:8000/api/get_similar_face/",
        type: "GET",
        success: function(data) {
            data = JSON.parse(data);
            console.log(data);
            if ( data.hasOwnProperty("msg") ) {
                // $("#errMsg").show();
                $("#myModal3").modal("show");
                $("#detailError").html("<font color='#f00'> Search Error: </font>" + data['msg'] + "! Please try again");
            } else {
                $("#searchResult").html("");
                for ( let j=0; j<data.length; j++ ) {
                    var li = $('<div class="img-panel"><img src="./pictures/dataset/'+data[j]+'" alt="similar face picture"></div>');
                    $("#searchResult").append(li);
                }
                $("#myModal2").modal("show");
                // $("#myModal3").modal("hide");
                // $("#detailError").html("");
            }
            $("#loading").hide();
        },
        error: function() {
            // $("#errMsg").show();
            $("#myModal3").modal("show");
            $("#detailError").html("<font color='#f00'>Search Error: </font> Server error, Please try again");
            $("#loading").hide();
        }
    });
});

// 进入第二步面板，隐藏第一步面板
$("#next_step").click(function() {
    $("#stepOne").hide();
    $("#stepTwo").show();
    $(pixSvg).hide();
    $("#gen_target_face").show();
    $("#search").hide();
    $("#loading2").hide();
    if ( whichModel == 0 ) {
        $(".sex").prop("checked", false);
        $(".sex").eq(1). prop("checked", true);
        list[1] = 1;
    } else if ( whichModel == 1 ) {
        $(".sex").prop("checked", false);
        $(".sex").eq(0). prop("checked", true);
        list[1] = 0;
    }
});

// 第二次的特征调节
$(".beard").change(function(){
    let value = $(this).val();
    list[0] = value;
});
$(".sex").change(function(){
    let value = $(this).val();
    list[1] = value;
});
$(".hair").change(function(){
    let value = $(this).val();
    list[2] = value;
});
$(".age").change(function(){
    let value = $(this).val();
    list[3] = value;
});
$(".glasses").change(function(){
    let value = $(this).val();
    list[4] = value;
});



// 调节第二次的特征，生成目标人脸
// $("#gen_target_face").click(function(){
//     $("#loading2").show();
//     $.ajax({
//         url: "http://localhost:8000/api/change_features/",
//         type: "POST",
//         data: {
//             "list": "[" + list + "]"
//         },
//         success: function(data) {
//             data = JSON.parse(data);
//             console.log(data);
//             var pic = data["image_path"];
//             $("#imgArea").css({"opacity": "1"});
//             $("#imgArea").attr("src", "./pictures/" + pic);
//             $("#stickFigure").css({"opacity": "0"});
//             $("#imgArea").css({
//                 "width": "300px",
//                 "height": "300px"
//             });
//             $("#gen_target_face").hide();
//             $("#search").show();
//             ifGenTargetFlag = true;
//
//             // 隐藏错误信息栏
//             $("#detailError").html("");
//             $("#errMsg").hide();
//             $("#loading2").hide();
//         },
//         error: function() {
//             // 展示错误信息栏
//             $("#errMsg").show();
//             $("#detailError").html("Get target face error! Please try again");
//             $("#loading2").hide();
//         }
//     });
// });

// 从第二步进入第一步
$("#prev_step").click(function() {
    $("#stepOne").show();
    $("#stepTwo").hide();
    if ( ifGenTargetFlag ) {
        $(pixSvg).show();
        $(imgArea).attr("src", "./pictures/" + pic);
        $(".pix_result").prop("checked", false);
        $(".pix_result").eq(0).prop("checked", true);
    } else {
        $(pixSvg).hide();
    }
});

// generate face prototype 生成原型脸
$("#gen_average_face").click(function(){
    $("#stick_figure_operation").hide();
    $("#loading").show();
    $(pixSvg).html(""); // 清除所有特征点
    $.ajax({
        url: "http://localhost:8000/api/get_average_face/",
        type: "GET",
        success: function(data) {
            data = JSON.parse(data);
            var pic = data["image_path"];
            $("#imgArea").css({"opacity": "1"});
            $("#imgArea").attr("src", "./pictures/" + pic);
            prototypePic = pic;
            imagePic = pic.split(".")[0];
            $("#stickFigure").css({"opacity": "0"});
            $("#stick_figure_operation").hide();
            $("#gen_face_feature").show();
            $("#search").show();

            // 隐藏特征点操作栏 和 svg显示
            $("#operationPanel").hide();
            $(pixSvg).html("");

            // 保存改变
            prototypePicFlag = true;
            stickFigureFlag = true;
            // $("#gen_average_face").show();
            // $("#next_step").show();

            // 隐藏错误信息栏
            // $("#detailError").html("");
            // $("#errMsg").hide();
            $("#loading").hide();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 展示错误信息栏
            $("#myModal3").modal("show");
            $("#detailError").html("<font color='#f00'>Get Prototype Face Error: </font> Server error, Please try again");
            $("#loading").hide();
        }
    });
});

// 生成简笔画事件
var gen_stick_figure = document.getElementById("gen_stick_figure");
gen_stick_figure.onclick = function() {
    $("#loading").show();
    var keys = Object.keys(landmark);
    for ( var j=0; j<keys.length; j++ ) {
        resultJson[0]['landmark'][keys[j]]['x'] = Math.floor(parseInt(resultJson[0]['landmark'][keys[j]]['x']) / scale);
        resultJson[0]['landmark'][keys[j]]['y'] = Math.floor(parseInt(resultJson[0]['landmark'][keys[j]]['y']) / scale);
    }
    $.ajax({
        url: "http://localhost:8000/api/get_stick_pic/",
        type: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        data: {
            "json_str": "["+ JSON.stringify(resultJson[0]) +"]"
        },
        success: function(data) {
            data = JSON.parse(data);
            var pic = data["image_path"];
            $("#imgArea").css({"opacity": "0"});
            $("#stickFigure").css({"opacity": "1"});
            $("#stickFigure").attr("src", "./pictures/" + pic);
            $("#stick_figure_operation").show();
            // 确保 选中第二个
            $(".pix_result").prop("checked", false);
            $(".pix_result").eq(1).prop("checked", true);
            $("#gen_average_face").show();
            $("#loading").hide();
            // $("#group_change").removeClass("in");
            // $("#group_change").removeClass("active");
            $("#group_change .part").prop("checked", false);
            $("#pixSvg path").remove();
            // $("#single_change").addClass("in");
            // $("#single_change").addClass("active");

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // alert("get stick figure");
            // 展示错误信息栏
            $("#myModal3").modal("show");
            $("#detailError").html("<font color='#f00'>Get Stick Figure Error: </font> Server error, Please try again");
            $("#loading").hide();
        }
    });
};

// 模板选择改变事件 —— model input 改变事件
// $(".model_type").change(function(){
//     let value = $(this).val();
//     if ( value == 0 ) {
//         imgArea.setAttribute("src", "./pictures/man.png");
//         $(imgArea).css({
//             "width": "auto",
//             "height": "auto"
//         });
//         imagePic = 'man';
//         whichModel = 0;
//         $(pixSvg).html("");
//         $("#stepOne").show();
//         $("#stepTwo").hide();
//         $("#operationPanel").hide();
//     } else {
//         imgArea.setAttribute("src", "./pictures/woman.png");
//         $(imgArea).css({
//             "width": "auto",
//             "height": "auto"
//         });
//         imagePic = 'woman';
//         whichModel = 1;
//         $(pixSvg).html("");
//         $("#stepOne").show();
//         $("#stepTwo").hide();
//         $("#operationPanel").hide();
//     }
// });
// 模板文件的选择
$(".model_type").change(function(){
    let value = $(this).val();
    if ( value == 0 ) {
        $("#maleWale").show();
        $("#femaleWale").hide();
    } else {
        $("#femaleWale").show();
        $("#maleWale").hide();
    }
});

$(".img-panel").click(function(){
    $(".img-panel").removeClass("img-panel-on");
    $(this).addClass("img-panel-on");
    var src = $(this).find("img").eq(0).attr("src");
    console.log(src);
    imgSrc = src;
});
$("#submit").click(function(){
    imgArea.src = imgSrc;
    var pic = imgSrc.replace("./pictures/", "").split(".")[0];
    $("#pixSvg").html(""); // 重新绘制特征点前，得清除之前生成的特征点
    getFeatures(pic);
});


// operation tools choice
$(".operation").change(function() {
    if ( bindingLeftAndRight ) {
        bindingLeftAndRight = false;
    } else {
        bindingLeftAndRight = true;
    }
});

// stick figure operation
$(".pix_result").change(function(){
    let val = $(this).val();
    console.log("pix result val : " + val);
    if ( val==0 ) {
        $("#imgArea").css({"opacity": "1"});
        $("#stickFigure").css({"opacity": "0"});
    } else if ( val == 1 ) {
        $("#imgArea").css({"opacity": "0"});
        $("#stickFigure").css({"opacity": "1"});
    } else if ( val == 2 ) {
        $("#imgArea").css({"opacity": "1"});
        $("#stickFigure").css({"opacity": "1"});
    }
});

/***************************************************
 * 绘制关键点
 * @type {string}
 ***************************************************/

// 所有的features所绘制的点的handle
function drawAllFeatures() {
    clearAllFeatures();
    for ( i=0; i<all_features.length; i++ ) {
        drawPix(landmark[all_features[i]]["x"], landmark[all_features[i]]["y"], baseColor, allFeaturesHandle, all_features[i]);
    }
    storeSymmetryHandle();
}

// 清除所有特征
function clearAllFeatures() {
    console.log(imgArea.width);
    scale = imgArea.width / 256;
    // scale = imgArea.width / 463;
    console.log("scale : " + scale);
    console.log("width : " + imgArea.width);
    landmark = resultJson[0]["landmark"];
    var keys = Object.keys(landmark);
    for ( var j=0; j<keys.length; j++ ) {
        landmark[keys[j]]['x'] = Math.floor(parseInt(landmark[keys[j]]['x']) * scale);
        landmark[keys[j]]['y'] = Math.floor(parseInt(landmark[keys[j]]['y']) * scale);
    }
    // 每次 生成简笔画 都需要 清除之前所做的所有操作
    prototypePicFlag = false;
    stickFigureFlag = false;
    ifGenTargetFlag = false;

    $("#gen_average_face").hide();
    $("#gen_stick_figure").hide();
    $("#next_step").hide();
    $("#stick_figure_operation").hide();

    $("#pixSvg").show();
    $("#imgArea").show();
    $("#stickFigure").hide();

    // 根据图片的大小，调整 简笔画图片 和 画布的大小
    pixSvg.setAttribute("width", imgArea.width);
    pixSvg.setAttribute("height", imgArea.height);
    stickFigure.setAttribute("width", imgArea.width);
    stickFigure.setAttribute("height", imgArea.height);
    stickFigure.setAttribute("style", "opacity: 0;");
    allFeaturesHandle = [];
}

// 点击 绘制人脸特征点 图片
$("#gen_face_feature").click(function(){
    // $("#loading").show();
    $("#pixSvg").html(""); // 重新绘制特征点前，得清除之前生成的特征点
    console.log(imgArea.src);
    var arr = imgArea.src.split("/");
    var pic = arr[arr.length-1].split(".")[0];
    console.log(pic);
    getFeatures(pic);
});

// 获取图片的特征点，循环获取
function getFeatures(image) {
    $("#loading").show();
    $.ajax({
        url: "http://localhost:8000/api/get_base_features/",
        type: "POST",
        async: true,
        data: {
            "img": image
        },
        dataType: "json",
        success: function(data) {
            // data = JSON.parse(data);
            if ( data.hasOwnProperty("msg") ) {
                // 展示错误信息栏
                $("#myModal3").modal("show");
                $("#detailError").html("<font color='#f00'>Draw Face Features Error: </font> "+data['msg']+", Please try again");
            } else {
                resultJson = data;
                changedJson = resultJson;
                drawAllFeatures(); // 绘制所有的特征点
                addEvents(); // 添加鼠标事件
                $("#gen_stick_figure").show();
                $("#operationPanel").show();
                // 隐藏错误信息栏

                // $("#detailError").html("");
                // $("#errMsg").hide();
            }
            $("#loading").hide();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 展示错误信息栏
            $("#myModal3").modal("show");
            $("#detailError").html("<font color='#f00'>Draw Face Features Error: </font> Server error, Please try again");
            // $("#errMsg").show();
            // $("#detailError").html("Draw face features error! Please try again");
            $("#loading").hide();
        }
    });
}

/***************************************************
 * 保存对称关键点
 * @type {string}
 ***************************************************/
function storeSymmetryHandle() {
    for ( i=0; i<allFeaturesHandle.length; i++ ) {
        allFeaturesSymmtery[i] = [];
    }

    // 轮廓
    allFeaturesSymmtery[0]["flag"] = false;
    allFeaturesSymmtery[0]["sym"] = null;
    for ( i=1; i<=16; i++ ) {
        allFeaturesSymmtery[i]["flag"] = true;
        allFeaturesSymmtery[i]["sym"] = allFeaturesHandle[i+16];
    }
    for ( i=1; i<=16; i++ ) {
        allFeaturesSymmtery[i+16]["flag"] = true;
        allFeaturesSymmtery[i+16]["sym"] = allFeaturesHandle[i];
    }
    // 眉毛
    for ( i=33; i<42; i++ ) {
        allFeaturesSymmtery[i]["flag"] = true;
        allFeaturesSymmtery[i]["sym"] = allFeaturesHandle[i+9];
    }
    for ( i=33; i<42; i++ ) {
        allFeaturesSymmtery[i+9]["flag"] = true;
        allFeaturesSymmtery[i+9]["sym"] = allFeaturesHandle[i];
    }
    // 眼睛
    for ( i=51; i<60; i++ ) {
        allFeaturesSymmtery[i]["flag"] = true;
        allFeaturesSymmtery[i]["sym"] = allFeaturesHandle[i+9];
    }
    for ( i=51; i<60; i++ ) {
        allFeaturesSymmtery[i+9]["flag"] = true;
        allFeaturesSymmtery[i+9]["sym"] = allFeaturesHandle[i];
    }
    // 鼻子
    allFeaturesSymmtery[69]["flag"] = false;
    allFeaturesSymmtery[69]["sym"] = null;
    for ( i=70; i<75; i++ ) {
        allFeaturesSymmtery[i]["flag"] = true;
        allFeaturesSymmtery[i]["sym"] = allFeaturesHandle[i+5];
    }
    for ( i=70; i<75; i++ ) {
        allFeaturesSymmtery[i+5]["flag"] = true;
        allFeaturesSymmtery[i+5]["sym"] = allFeaturesHandle[i];
    }
    for ( i=80; i<84; i++ ) {
        allFeaturesSymmtery[i]["flag"] = false;
        allFeaturesSymmtery[i]["sym"] = null;
    }
    // 嘴巴
    allFeaturesSymmtery[84]["flag"] = true;
    allFeaturesSymmtery[84]["sym"] = allFeaturesHandle[102];
    // 嘴巴上嘴唇上侧
    for ( i=0; i<2; i++ ) {
        allFeaturesSymmtery[85+i]["flag"] = true;
        allFeaturesSymmtery[85+i]["sym"] = allFeaturesHandle[85+4-i];
    }
    allFeaturesSymmtery[87]["flag"] = false;
    allFeaturesSymmtery[87]["sym"] = null;
    for ( i=0; i<2; i++ ) {
        allFeaturesSymmtery[85+4-i]["flag"] = true;
        allFeaturesSymmtery[85+4-i]["sym"] = allFeaturesHandle[85+i];
    }
    // 嘴巴上嘴唇下侧
    for ( i=0; i<2; i++ ) {
        allFeaturesSymmtery[90+i]["flag"] = true;
        allFeaturesSymmtery[90+i]["sym"] = allFeaturesHandle[90+3-i];
    }
    for ( i=0; i<2; i++ ) {
        allFeaturesSymmtery[90+3-i]["flag"] = true;
        allFeaturesSymmtery[90+3-i]["sym"] = allFeaturesHandle[90+i];
    }
    // 嘴巴下嘴唇上侧
    allFeaturesSymmtery[94]["flag"] = true;
    allFeaturesSymmtery[94]["sym"] = allFeaturesHandle[96];
    allFeaturesSymmtery[95]["flag"] = false;
    allFeaturesSymmtery[95]["sym"] = null;
    allFeaturesSymmtery[96]["flag"] = true;
    allFeaturesSymmtery[96]["sym"] = allFeaturesHandle[94];
    // 嘴巴下嘴唇下侧
    for ( i=0; i<2; i++ ) {
        allFeaturesSymmtery[97+i]["flag"] = true;
        allFeaturesSymmtery[97+i]["sym"] = allFeaturesHandle[97+4-i];
    }
    allFeaturesSymmtery[99]["flag"] = false;
    allFeaturesSymmtery[99]["sym"] = null;
    for ( i=0; i<2; i++ ) {
        allFeaturesSymmtery[97+4-i]["flag"] = true;
        allFeaturesSymmtery[97+4-i]["sym"] = allFeaturesHandle[97+i];
    }
    allFeaturesSymmtery[102]["flag"] = true;
    allFeaturesSymmtery[102]["sym"] = allFeaturesHandle[84];
}



/***************************************************
 * 所有handle的事件
 * @type {string}
 ***************************************************/

var flag = false;
var moveIndex = -1;

function addEvents() {
    pixSvg.onmousemove = function(event){
        if ( flag && moveIndex!=-1 ) {
            var coordinate = getMouseCoordinate(event); // 获取鼠标的坐标
            var x = parseInt(coordinate.x) - parseInt(svgLeft); // 确定被拖动点的x值
            var y = parseInt(coordinate.y) - parseInt(svgTop); // 确定被拖动点的y值
            var disX = parseInt(x) - parseInt(landmark[all_features[moveIndex]]["x"]); // 计算移动x的差值
            var disY = parseInt(y) - parseInt(landmark[all_features[moveIndex]]["y"]); // 计算移动y的差值
            allFeaturesHandle[moveIndex].setAttribute("cx", x);
            allFeaturesHandle[moveIndex].setAttribute("cy", y- 22.5);
            console.log("x:y " + x + " : " + y);
            console.log("disX:disY " + disX + " : " + disY);
            // 记录change
            resultJson[0]["landmark"][all_features[moveIndex]]["x"] = Math.floor(x);
            resultJson[0]["landmark"][all_features[moveIndex]]["y"] = Math.floor(y - 22.5);
            if ( bindingLeftAndRight ) { // 对称操作
                if ( allFeaturesSymmtery[moveIndex]["flag"] ) {
                    allFeaturesSymmtery[moveIndex]["sym"].setAttribute("cx", parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["x"])-disX);
                    allFeaturesSymmtery[moveIndex]["sym"].setAttribute("cy", parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["y"])+disY- 22.5);
                    console.log("symtery " + parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["y"]) + " : " + parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["y"]));
                    console.log("symtery true " + parseInt( (landmark[all_features_symtery[moveIndex]["sym"]]["y"])-disX) + " : " + (parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["y"]) + disY));
                    // 记录change
                    resultJson[0]["landmark"][all_features_symtery[moveIndex]["sym"]]["x"] = Math.floor(parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["x"])-disX);
                    resultJson[0]["landmark"][all_features_symtery[moveIndex]["sym"]]["y"] = Math.floor(parseInt(landmark[all_features_symtery[moveIndex]["sym"]]["y"])+disY- 22.5);
                }
            }
        }
    };
    pixSvg.onmouseup = function(event) {
        if ( flag ) {
            allFeaturesHandle[moveIndex].setAttribute("r", 2);
            allFeaturesHandle[moveIndex].setAttribute("fill", baseColor);
            if ( bindingLeftAndRight ) { // 对称操作
                if ( allFeaturesSymmtery[moveIndex]["flag"] ) {
                    allFeaturesSymmtery[moveIndex]["sym"].setAttribute("r", 2);
                    allFeaturesSymmtery[moveIndex]["sym"].setAttribute("fill", baseColor);
                }
            }
            flag = false;
            moveIndex = -1;
        }
    };


    allFeaturesHandle.forEach(function (current, index, arr) {
        // 特征点鼠标事件
        (function(i){
            allFeaturesHandle[i].onmouseover = function () {
                if ( !flag ) {
                    $("#features_desc").html(descriptionArr[i][1]);
                    this.setAttribute("r", 5);
                    // this.setAttribute("fill", selectedColor);
                    this.setAttribute("fill", "rgba(255, 0, 0, 0.5)");
                }
                if ( bindingLeftAndRight ) { // 对称操作
                    if ( allFeaturesSymmtery[i]["flag"] ) {
                        allFeaturesSymmtery[i]["sym"].setAttribute("r", 5);
                        allFeaturesSymmtery[i]["sym"].setAttribute("fill", "rgba(255, 0, 0, 0.5)");
                    }
                }
            };

            allFeaturesHandle[i].onmouseout = function () {
                if ( !flag ) {
                    $("#features_desc").html(baseTip);
                    this.setAttribute("r", 2);
                    this.setAttribute("fill", baseColor);
                }
                if ( bindingLeftAndRight ) { // 对称操作
                    if ( allFeaturesSymmtery[i]["flag"] ) {
                        allFeaturesSymmtery[i]["sym"].setAttribute("r", 2);
                        allFeaturesSymmtery[i]["sym"].setAttribute("fill", baseColor);
                    }
                }
            };
            allFeaturesHandle[i].onmousedown = function (event) {
                if ( !flag ) {
                    flag = true;
                    moveIndex = i;
                }
            };
            allFeaturesHandle[i].onmouseup = function (event) {
                if ( flag ) {
                    this.setAttribute("r", 2);
                    this.setAttribute("fill", baseColor);
                    if ( bindingLeftAndRight ) { // 对称操作
                        if ( allFeaturesSymmtery[i]["flag"] ) {
                            allFeaturesSymmtery[i]["sym"].setAttribute("r", 2);
                            allFeaturesSymmtery[i]["sym"].setAttribute("fill", baseColor);
                        }
                    }
                    flag = false;
                    moveIndex = -1;
                }
            };
        })(index);
    });
}

// 获取鼠标的坐标
function getMouseCoordinate(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return {"x": x, "y": y};
}


// 绘制特征点
function drawPix(x, y, color, arr, id) {
    var circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 2);
    circle.setAttribute("fill", color);
    circle.setAttribute("id", id);
    circle.setAttribute("cursor", "pointer");
    arr.push(circle);
    pixSvg.appendChild(circle);
}


});
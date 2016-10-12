/**
 * Created by Koplak on 12-Oct-16.
 */
angular.module('starter.directives', ['ngCordova'])
.directive('transform', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $timeout(function() {
                console.log($element);
                var square = $element[0],
                    posX = 0,
                    posY = 0,
                    lastPosX = 0,
                    lastPosY = 0,
                    bufferX = 0,
                    bufferY = 0,
                    scale = 1,
                    lastScale=$element[0].width,
                    rotation = 0,
                    last_rotation, dragReady = 0;
                ionic.onGesture('touch drag transform dragend transformend', function(e) {
                    e.gesture.srcEvent.preventDefault();
                    e.gesture.preventDefault();
                    switch (e.type) {
                        case 'touch':
                            console.log('touch');
                            lastScale = scale;
                            last_rotation = rotation;
                            posX = lastPosX;
                            posY = lastPosY;
                            break;
                        case 'drag':
                            posX = e.gesture.deltaX + lastPosX;
                            posY = e.gesture.deltaY + lastPosY;
                            break;
                        case 'transform':
                            console.log('transform');
                            rotation = e.gesture.rotation + last_rotation;
                            scale = e.gesture.scale * lastScale;
                            posX = lastPosX;
                            posY = lastPosY;
                            console.log("X: ",lastPosX);
                            console.log("Y: ",lastPosY);
                            break;
                        case 'dragend':
                            lastPosX = posX;
                            lastPosY = posY;
                            lastScale = scale;
                            break;
                        case 'transformend':
                            console.log('transformend');
                            posX = lastPosX;
                            posY = lastPosY;
                            lastScale = scale;
                            last_rotation = rotation;
                            break;
                    }
                    var transform =
                        "translate3d(" + posX + "px," + posY + "px, 0) " +
                        "scale(" + scale + ")" +
                        "rotate(" + rotation + "deg) ";
                    e.target.style.transform = transform;
                    e.target.style.webkitTransform = transform;
                }, $element[0]);
            });
        }
    };
})

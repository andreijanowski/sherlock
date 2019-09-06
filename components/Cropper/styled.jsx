import styled, { createGlobalStyle } from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  flexDirection: "column"
}))`
  width: calc(100vw - 128px);
  max-width: 100vw;
  height: calc(100vh - 128px);
  max-height: 100vh;
`;

export const CropperStyles = createGlobalStyle`
/* stylelint-disable property-no-vendor-prefix */
    .cropper-container {
        position: relative;
        font-size: 0;
        line-height: 0;
        direction: ltr;
        border: 1px dashed rgb(${p => p.theme.colors.snuff});
        border-radius: ${p => p.theme.radius.small};
        -webkit-user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        user-select: none;
        -ms-touch-action: none;
        touch-action: none;
    }
    /* stylelint-enable */

    .cropper-container img {
        display: block;
        width: 100%;
        min-width: 0 !important;
        max-width: none !important;
        height: 100%;
        min-height: 0 !important;
        image-orientation: 0deg;
        max-height: none !important;
    }

    .cropper-wrap-box,
    .cropper-canvas,
    .cropper-drag-box,
    .cropper-crop-box,
    .cropper-modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .cropper-wrap-box,
    .cropper-canvas {
        overflow: hidden;
    }

    .cropper-drag-box {
        background-color: #fff;
        opacity: 0;
    }

    .cropper-modal {
        background-color: rgb(${p => p.theme.colors.white});
        opacity: .5;
    }

    .cropper-view-box {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 1px solid rgb(${p => p.theme.colors.blue});
    }

    .cropper-dashed {
        position: absolute;
        display: block;
        border: 0 dashed rgb(${p => p.theme.colors.snuff});
        opacity: .5;
    }

    .cropper-dashed.dashed-h {
        top: calc(100% / 3);
        left: 0;
        width: 100%;
        height: calc(100% / 3);
        border-top-width: 1px;
        border-bottom-width: 1px;
    }

    .cropper-dashed.dashed-v {
        top: 0;
        left: calc(100% / 3);
        width: calc(100% / 3);
        height: 100%;
        border-right-width: 1px;
        border-left-width: 1px;
    }

    .cropper-center {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0;
        height: 0;
        opacity: .75;
    }

    .cropper-center:before,
    .cropper-center:after {
        position: absolute;
        display: block;
        background-color: #eee;
        content: ' ';
    }

    .cropper-center:before {
        top: 0;
        left: -3px;
        width: 7px;
        height: 1px;
    }

    .cropper-center:after {
        top: -3px;
        left: 0;
        width: 1px;
        height: 7px;
    }

    .cropper-face,
    .cropper-line,
    .cropper-point {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        border-radius:${p => p.theme.radius.default};
        opacity: .1;
    }

    .cropper-face {
        top: 0;
        left: 0;
        background-color: #fff;
    }

    .cropper-line {
        background-color: rgb(${p => p.theme.colors.blue});
    }

    .cropper-line.line-e {
        top: 0;
        right: -3px;
        width: 5px;
        cursor: ew-resize;
    }

    .cropper-line.line-n {
        top: -3px;
        left: 0;
        height: 5px;
        cursor: ns-resize;
    }

    .cropper-line.line-w {
        top: 0;
        left: -3px;
        width: 5px;
        cursor: ew-resize;
    }

    .cropper-line.line-s {
        bottom: -3px;
        left: 0;
        height: 5px;
        cursor: ns-resize;
    }

    .cropper-point {
        width: 5px;
        height: 5px;
        background-color: rgb(${p => p.theme.colors.blue});
        opacity: .75;
    }

    .cropper-point.point-e {
        top: 50%;
        right: -3px;
        margin-top: -3px;
        cursor: ew-resize;
    }

    .cropper-point.point-n {
        top: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: ns-resize;
    }

    .cropper-point.point-w {
        top: 50%;
        left: -3px;
        margin-top: -3px;
        cursor: ew-resize;
    }

    .cropper-point.point-s {
        bottom: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: s-resize;
    }

    .cropper-point.point-ne {
        top: -3px;
        right: -3px;
        cursor: nesw-resize;
    }

    .cropper-point.point-nw {
        top: -3px;
        left: -3px;
        cursor: nwse-resize;
    }

    .cropper-point.point-sw {
        bottom: -3px;
        left: -3px;
        cursor: nesw-resize;
    }

    .cropper-point.point-se {
        right: -3px;
        bottom: -3px;
        width: 20px;
        height: 20px;
        cursor: nwse-resize;
        opacity: 1;
    }

    @media (min-width: 768px) {
        .cropper-point.point-se {
        width: 15px;
        height: 15px;
        }
    }

    @media (min-width: 992px) {
        .cropper-point.point-se {
        width: 10px;
        height: 10px;
        }
    }

    @media (min-width: 1200px) {
        .cropper-point.point-se {
        width: 5px;
        height: 5px;
        opacity: .75;
        }
    }

    .cropper-point.point-se:before {
        position: absolute;
        right: -50%;
        bottom: -50%;
        display: block;
        width: 200%;
        height: 200%;
        background-color: rgb(${p => p.theme.colors.blue});
        opacity: 0;
        content: ' ';
    }

    .cropper-invisible {
        opacity: 0;
    }

    .cropper-bg {
        background: rgb(${p => p.theme.colors.white});
    }

    .cropper-hide {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
    }

    .cropper-hidden {
        display: none !important;
    }

    .cropper-move {
        cursor: move;
    }

    .cropper-crop {
        cursor: crosshair;
    }

    .cropper-disabled .cropper-drag-box,
    .cropper-disabled .cropper-face,
    .cropper-disabled .cropper-line,
    .cropper-disabled .cropper-point {
        cursor: not-allowed;
    }
`;

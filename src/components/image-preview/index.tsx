import type { Photo } from "@/types/photo.type";
import {
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";
import React from "react";
import "./styles.css";

type Props = {
  imageList: Pick<Photo, "id" | "title" | "thumbnailUrl">[];
};

export const ImagePreview: React.FC<Props> = ({ imageList }) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <Image.PreviewGroup
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: {
              onActive,
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          }
        ) => (
          <Space size={12} className="toolbar-wrapper">
            <LeftOutlined onClick={() => onActive?.(-1)} />
            <RightOutlined onClick={() => onActive?.(1)} />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
            <UndoOutlined onClick={onReset} />
          </Space>
        ),
        onChange: (index) => {
          setCurrent(index);
        },
      }}
    >
      {imageList.map((item) => (
        <Image
          key={item.id}
          src={item.thumbnailUrl}
          alt={item.title}
          width={200}
        />
      ))}
    </Image.PreviewGroup>
  );
};

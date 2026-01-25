import React, { useEffect, useRef } from "react";
import { init, type WalineInstance, type WalineInitOptions } from "@waline/client";
import "@waline/client/style";

export type WalineOptions = Omit<WalineInitOptions, "el"> & { path: string };

export default function WalineComment(props: WalineOptions) {
  const walineRef = useRef<WalineInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // mount / unmount
  useEffect(() => {
    walineRef.current = init({
      ...props,
      el: containerRef.current!,
    });

    return () => walineRef.current?.destroy();
    // 只 mount 一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update when props change (e.g. path)
  useEffect(() => {
    walineRef.current?.update(props);
  }, [props]);

  return <div ref={containerRef} />;
}

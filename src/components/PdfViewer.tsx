'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Spin } from 'antd';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: Readonly<PdfViewerProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    async function renderPdf() {
      try {
        setLoading(true);
        setError(null);

        const loadingTask = pdfjsLib.getDocument({ url });
        const pdf = await loadingTask.promise;

        if (cancelled) return;
        setNumPages(pdf.numPages);

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) break;

          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.display = 'block';
          canvas.style.marginBottom = '12px';
          canvas.style.borderRadius = '8px';
          canvas.style.boxShadow = '0 1px 4px rgba(0,0,0,0.12)';

          await page.render({ canvas, viewport }).promise;

          if (!cancelled && containerRef.current) {
            containerRef.current.appendChild(canvas);
          }
        }

        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError('無法載入 PDF，請確認檔案路徑是否正確。');
          setLoading(false);
        }
      }
    }

    renderPdf();
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <Spin spinning={loading}>
      <div className="min-h-[200px]">
        <div ref={containerRef} />
        {!loading && numPages > 0 && (
          <p className="mt-2 text-center text-xs text-gray-400">共 {numPages} 頁</p>
        )}
      </div>
    </Spin>
  );
}

'use client'

import { useState, useRef } from 'react'
import { Tab, Tabs } from '@heroui/react'
import { formatCurrency } from '@utils'
import ProductFittings from './ProductFittings'
import SizeGuide from './SizeGuide'

type Props = {
  sizes: IProductSizes
  activeFitting: Fitting
  type: ProductType
  price: number
  discountPrice: number
  onChangeFitting: (fitting: Fitting) => void
  onChangeSize: (size: Size) => void
}

export default function ProductSizes({ activeFitting, sizes, type, price, discountPrice, onChangeFitting, onChangeSize }: Props) {
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const MIN_ZOOM = 0.5
  const MAX_ZOOM = 2
  const ZOOM_STEP = 0.25

  function handleZoomIn() {
    setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM))
  }

  function handleZoomOut() {
    setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM))
  }

  function handleFullscreen() {
    if (!isFullscreen) {
      contentRef.current?.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  function handleClose() {
    setShowSizeGuide(false)
    setZoom(1)
    setIsFullscreen(false)
  }

  return (
    <>
      {type === 'trouser' || type === 'short' ? (
        <ProductFittings activeFitting={activeFitting} onChangeFitting={onChangeFitting} />
      ) : null}

      <p className="text-sm">SIZE</p>

      <div className="w-max">
        <Tabs
          aria-label="Product Sizes"
          classNames={{
            panel: 'p-0',
            base: 'flex flex-row gap-3',
            tabList: 'flex flex-row gap-3 p-0',
            tab: 'w-[3.125rem] h-[2.5rem] text-black border border-foreground cursor-pointer hover:bg-gray-100 data-[selected=true]:border-brand-dark'
          }}
          onSelectionChange={(key) => onChangeSize(key as Size)}
        >
          {Object.entries(sizes).map(([key, details]) => (
            <Tab key={key} title={key.toUpperCase()}>
              <div className="w-full flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-black mt-2.5 underline text-xs transition-transform active:scale-95 text-end"
                >
                  View size guide
                </button>
              </div>

              <div className="py-1.5 px-2.5 w-max text-[10px] bg-foreground rounded-[3.75rem] text-brand-dark">
                <span>{details.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>

              <p className="mt-5 text-sm">PRICE</p>
              <p className="mt-1.5 font-medium">{formatCurrency(discountPrice || price)}</p>
            </Tab>
          ))}
        </Tabs>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-sm animate-enter">

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] bg-white">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-1.5 text-[#202020] hover:opacity-60 transition-opacity"
            >
              {/* Left chevron */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="text-sm font-medium tracking-wide text-[#202020]">Size Guide</span>

            <button
              type="button"
              onClick={handleClose}
              className="text-[#202020] hover:opacity-60 transition-opacity"
            >
              {/* X */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable content with zoom */}
          <div className="flex-1 overflow-auto bg-[#e8e8e8]" ref={contentRef}>
            <div
              className="min-h-full flex items-start justify-center py-6 px-4"
              style={{ transformOrigin: 'top center' }}
            >
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s ease',
                  width: zoom > 1 ? `${100 / zoom}%` : '100%'
                }}
              >
                <SizeGuide modal />
              </div>
            </div>
          </div>

          {/* Bottom controls bar — matches screenshot exactly */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#e0e0e0] bg-white">

            {/* Zoom controls */}
            <div className="flex items-center gap-3">
              {/* Zoom in */}
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="text-[#202020] hover:opacity-60 disabled:opacity-30 transition-opacity"
                aria-label="Zoom in"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>

              {/* Zoom out */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="text-[#202020] hover:opacity-60 disabled:opacity-30 transition-opacity"
                aria-label="Zoom out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>

            {/* Page indicator with arrows */}
            <div className="flex items-center gap-3 text-[#202020]">
              {/* Left arrow — disabled since single page */}
              <button type="button" disabled className="opacity-30" aria-label="Previous page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <span className="text-xs font-normal text-[#202020] tracking-wide">1 / 1</span>

              {/* Right arrow — disabled since single page */}
              <button type="button" disabled className="opacity-30" aria-label="Next page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="text-[#202020] hover:opacity-60 transition-opacity"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
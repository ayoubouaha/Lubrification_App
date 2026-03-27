import { useMemo, useRef, useState, useEffect, type MouseEvent as ReactMouseEvent, type WheelEvent as ReactWheelEvent } from 'react';
import DiagramMarker from '../DiagramMarker/DiagramMarker';
import { type DiagramPoint } from '../types';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useLubricationPoint } from '../../../hooks/useLubricationPoint';
import { useLubricationPointBatch } from '../../../hooks/useLubricationPointBatch';
import LubricationInfoCard from '../LubricationInfoCard/LubricationInfoCard';
import { getDbNameCandidates } from '../diagramPointUtils';
import './InteractiveDiagram.css';

interface InteractiveDiagramProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  points: DiagramPoint[];
  size?: 'default' | 'compact' | 'small';
  enableCoordinatePicker?: boolean;
  showHeader?: boolean;
  showPickerWhenHeaderHidden?: boolean;
  onPointClick?: (point: DiagramPoint) => void;
  initialActivePointId?: string;
}
const getIdentifiers = (point?: DiagramPoint | null): string[] => {
  if (!point) {
    return [];
  }

  const rawIdentifiers = [point.tagPrimary, point.tagSecondary].filter(Boolean).join(' / ');

  if (!rawIdentifiers.trim()) {
    return [];
  }

  return rawIdentifiers
    .split(/\s*\/\s*|\r?\n|\s*,\s*/)
    .map(value => value.trim())
    .filter(Boolean);
};

const InteractiveDiagram = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  points,
  size = 'default',
  enableCoordinatePicker: _enableCoordinatePicker = false,
  showHeader = true,
  showPickerWhenHeaderHidden: _showPickerWhenHeaderHidden = false,
  onPointClick,
  initialActivePointId = '',
}: InteractiveDiagramProps) => {
  const [activePointId, setActivePointId] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);

  const dragStateRef = useRef({ startX: 0, startY: 0, originPanX: 0, originPanY: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);
  const markersLayerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const activePoint = useMemo(() => {
    if (!activePointId) {
      return null;
    }

    return points.find(point => point.id === activePointId) ?? null;
  }, [activePointId, points]);

  // Collect all DB names from all points for batch fetching (markers only)
  const allMarkerDbNames = useMemo(() => {
    const names = new Set<string>();
    points.forEach(point => {
      getDbNameCandidates(point).forEach(name => names.add(name));
    });
    return [...names];
  }, [points]);

  // Batch fetch all markers at once (replaces individual polling)
  const { lubricationDataMap } = useLubricationPointBatch(allMarkerDbNames);

  const popupIdentifiers = useMemo(() => getIdentifiers(activePoint), [activePoint]);
  const pointDbNames = useMemo(() => getDbNameCandidates(activePoint), [activePoint]);

  // Abort controller for popup to stop polls immediately when closed
  useEffect(() => {
    if (activePointId && !abortControllerRef.current) {
      abortControllerRef.current = new AbortController();
    } else if (!activePointId && abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [activePointId]);

  // Popup polling (only when active, aborted on close)
  const { data, status, errorMessage, refresh } = useLubricationPoint(
    pointDbNames,
    Boolean(activePointId),
    abortControllerRef.current?.signal,
  );

  const popupFrequency = activePoint?.frequency ?? '';
  const popupPlannedAmount = activePoint?.plannedAmount ?? '';
  const hasPopupContent = Boolean(
    popupIdentifiers.length || popupFrequency || popupPlannedAmount || pointDbNames.length,
  );

  useOutsideClick(popupRef, () => {
    setActivePointId('');
  });

  useEffect(() => {
    if (!initialActivePointId) {
      return;
    }

    setActivePointId(previous => (previous === initialActivePointId ? previous : initialActivePointId));
  }, [initialActivePointId]);

  useEffect(() => {
    if (!activePointId || !markersLayerRef.current) {
      return;
    }

    const markers = Array.from(
      markersLayerRef.current.querySelectorAll<HTMLButtonElement>('.diagram-marker'),
    );

    const target = markers.find(marker => marker.dataset.pointId === activePointId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }, [activePointId]);

  const handleMarkerClick = (point: DiagramPoint) => {
    onPointClick?.(point);
    setActivePointId(previous => (previous === point.id ? '' : point.id));
  };

  const handleWheelZoom = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const ZOOM_STEP = 0.1;
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 3;

    const direction = event.deltaY > 0 ? -1 : 1;
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + direction * ZOOM_STEP));

    if (nextZoom === zoom) {
      return;
    }

    setZoom(nextZoom);

    if (nextZoom === MIN_ZOOM) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('.diagram-marker') || zoom <= 1) {
      return;
    }

    event.preventDefault();
    setIsPanning(true);
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originPanX: panX,
      originPanY: panY,
    };
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!isPanning) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;

    setPanX(dragStateRef.current.originPanX + deltaX);
    setPanY(dragStateRef.current.originPanY + deltaY);
  };

  const stopPanning = () => {
    setIsPanning(false);
  };

  return (
    <section className={`interactive-diagram interactive-diagram--${size}`} aria-label={title}>
      {showHeader ? (
        <header className="interactive-diagram__header">
          <h1 className="interactive-diagram__title">{title}</h1>
          {subtitle ? <p className="interactive-diagram__subtitle">{subtitle}</p> : null}
        </header>
      ) : null}

      <div className="interactive-diagram__workspace">
        <div
          className={`interactive-diagram__canvas ${zoom > 1 ? 'interactive-diagram__canvas--zoomed' : ''} ${isPanning ? 'interactive-diagram__canvas--panning' : ''}`}
          onWheel={handleWheelZoom}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopPanning}
          onMouseLeave={stopPanning}
        >
          <div
            className={`interactive-diagram__transform-layer ${isPanning ? 'interactive-diagram__transform-layer--panning' : ''}`}
            style={{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})` }}
          >
            <div className="interactive-diagram__stage">
              <img
                ref={imageRef}
                className="interactive-diagram__image"
                src={imageSrc}
                alt={imageAlt}
                draggable={false}
                decoding="async"
              />

              <div
                ref={markersLayerRef}
                className="interactive-diagram__markers-layer"
                aria-hidden="true"
              >
                {points.map(point => (
                  <DiagramMarker
                    key={point.id}
                    point={point}
                    isActive={point.id === activePoint?.id}
                    onClick={handleMarkerClick}
                    lubricationDataMap={lubricationDataMap}
                  />
                ))}

                {activePoint && hasPopupContent && (
                  <div
                    ref={popupRef}
                    className="interactive-diagram__popup interactive-diagram__popup--below"
                    style={{ left: `${activePoint.xPercent}%`, top: `${activePoint.yPercent}%` }}
                    role="dialog"
                    aria-live="polite"
                  >
                    <LubricationInfoCard
                      identifiers={popupIdentifiers}
                      frequency={popupFrequency}
                      plannedAmount={popupPlannedAmount}
                      liveData={data}
                      status={status}
                      errorMessage={errorMessage}
                      onRetry={() => {
                        void refresh();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDiagram;

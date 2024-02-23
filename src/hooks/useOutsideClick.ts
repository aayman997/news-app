import { RefObject, useCallback, useRef, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(handler?: () => void, listenCapturing = true): RefObject<T> => {
	const ref = useRef<T>(null);

	const handleClickOutsideElement = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				handler?.();
			}
		},
		[handler],
	);

	useEffect(() => {
		document.addEventListener("click", handleClickOutsideElement, listenCapturing);
		return () => document.removeEventListener("click", handleClickOutsideElement, listenCapturing);
	}, [handler, listenCapturing, handleClickOutsideElement]);

	return ref;
};

export default useOutsideClick;

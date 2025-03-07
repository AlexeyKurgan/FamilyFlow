
import { useMemo } from "react";

export const SLICE_START = 0;
export const SLICE_END = 4;

export const useDisplayedSliceData = <T>(arr: T[] | null | undefined) => {
    const displayedData = useMemo(() => {
        return arr?.slice(SLICE_START, SLICE_END) || []
    }, [arr])

    return displayedData;
}
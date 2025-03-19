import { useMemo } from "react";

export const SLICE_START = 0;
export const SLICE_END = 4;

interface WithCreatedAt {
    created_at?: string | Date;
}

export const useDisplayedSliceData = <T extends object>(
    arr: T[] | null | undefined,
    sliceStart: number = SLICE_START,
    sliceEnd: number = SLICE_END
) => {
    const displayedData = useMemo(() => {
        if (!arr) return [];

        const hasCreatedAt = arr.length > 0 && "created_at" in arr[0];
        const result = [...arr];

        if (hasCreatedAt) {
            result.sort((a, b) => {
                const dateA = new Date((a as T & WithCreatedAt).created_at!).getTime();
                const dateB = new Date((b as T & WithCreatedAt).created_at!).getTime();
                return dateB - dateA;
            });
        }

        return result.slice(sliceStart, sliceEnd);
    }, [arr, sliceStart, sliceEnd]);

    return displayedData;
};
export const viewBoxes: { [key: string]: string } = {
    video: '0 0 600 600',
    link: '0 0 24 24',
    book: '0 0 32 32',
};

export type ViewBoxType = keyof typeof viewBoxes;
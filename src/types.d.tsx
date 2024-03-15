export type Group = {
    title: string;
    blocks: Block[];
    defaultOpen?: boolean;
};

export type Block = {
    _key: string;
    name: string;
    title: string;
    description?: string;
    imageURL?: URL;
};

export type Options = {
    blockPreviews: {
        title: string;
        blocks: {
            [name: string]: {
                description?: string;
                imageURL?: string;
            };
        };
    }[];
    excludedBlocks?: string[];
    showOther?: boolean;
    text?: TextOptions;
};

export type TextOptions = {
    addItem?: string;
    dialogTitle?: string;
    searchPlaceholder?: string;
    other?: string;
};

export type OnBlockSelectFn = (block: Block) => void;

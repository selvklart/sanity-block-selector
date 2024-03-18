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
    initialValue: InitialValue;
};

export type InitialValue = Record<string, unknown> | null;

export type Options = {
    /**
     * The type of the field that the block selector is used in.
     * portable-text corresponds to the textarea fields in Sanity, replacing the ellipsis button.
     * content-array corresponds to the array fields in Sanity, replacing the "+Add item" button.
     */
    type: 'portable-text' | 'content-array';

    /**
     * This field contains the necessary information to render each block, inside the block selector.
     * Each item in the array is a group of blocks, with a title and a list of blocks.
     * A group corresponds to an accordion tab, while each block corresponds to a button.
     * The keys of the blocks object are the block names, as defined in the Sanity schema.
     */
    blockPreviews: {
        title: string;
        blocks: {
            [name: string]: {
                description?: string;
                imageURL?: string;
            };
        };
    }[];
    /**
     * Set this to true to show the "Other" accordion tab.
     * This tab contains all the blocks that are not in the blockPreviews prop.
     */
    showOther?: boolean;
    /**
     * An array of block names to exclude from the block selector.
     */
    excludedBlocks?: string[];
    /**
     * Override the default text strings used in the block selector.
     */
    text?: TextOptions;
    /**
     * An array of CSS selectors that correspond to the elements that should be replaced with the block selector button.
     * The default queries depend on the type prop, and should work for most cases.
     * But if they don't you have the freedom to override them.
     */
    replaceQueries?: ReplaceQuery[];
};

export type ReplaceQuery = {
    level: 'document' | 'field';
    query: string;
};

export type TextOptions = {
    addItem?: string;
    dialogTitle?: string;
    searchPlaceholder?: string;
    other?: string;
};

export type OnBlockSelectFn = (block: Block) => void;

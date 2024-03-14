export type Group = {
    title: string;
    blocks: Block[];
    defaultOpen?: boolean;
};

export type Block = {
    title: string;
    description?: string;
    imageURL?: URL;
};

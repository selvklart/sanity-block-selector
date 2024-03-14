import type {Group} from '../../src/types.d';

export const mockGroups: Group[] = [
    {
        title: 'Content',
        blocks: [
            {
                title: 'Accordion',
                description: 'A list of expandable items',
                imageURL: new URL('./static/accordion.png', import.meta.url),
            },
            {
                title: 'Featured Content',
                description: 'A list of featured content',
                imageURL: new URL('./static/article-list.png', import.meta.url),
            },
            {
                title: 'Featured Content Grid',
                description: 'A grid of featured content',
                imageURL: new URL('./static/article-list-from-feed.png', import.meta.url),
            },
            {
                title: 'Featured Link List',
                description: 'A list of featured links',
                imageURL: new URL('./static/article-selection.png', import.meta.url),
            },
            {
                title: 'Featured Quote',
                description: 'A featured quote',
                imageURL: new URL('./static/contact-person-list.png', import.meta.url),
            },
            {
                title: 'Featured Quotes',
                description: 'A list of featured quotes',
                imageURL: new URL('./static/contact-person-selection.png', import.meta.url),
            },
            {
                title: 'Shared Content Reference',
                description: 'A list of shared content references',
                imageURL: new URL('./static/dealer-list.png', import.meta.url),
            },
            {
                title: 'Search Box',
                imageURL: new URL('./static/dealer-map.png', import.meta.url),
            },
            {
                title: 'Tabbed Content',
                imageURL: new URL('./static/dealer-selection.png', import.meta.url),
            },
            {
                title: 'Table',
                imageURL: new URL('./static/document-group-block.png', import.meta.url),
            },
        ],
    },
    {
        title: 'Media',
        blocks: [
            {
                title: 'Images',
                description: 'A list of images',
                imageURL: new URL('./static/document-group-list.png', import.meta.url),
            },
            {
                title: 'Images With Actions',
                description: 'A list of images with actions',
                imageURL: new URL('./static/document-list.png', import.meta.url),
            },
            {
                title: 'YouTube Video',
                description: 'A YouTube video',
                imageURL: new URL('./static/door-type-list.png', import.meta.url),
            },
            {
                title: 'YouTube Video Selection',
                description: 'A list of YouTube videos with a selection',
                imageURL: new URL('./static/featured-content.png', import.meta.url),
            },
        ],
    },
    {
        title: 'Articles',
        blocks: [
            {
                title: 'Article List',
                description: 'A list of articles',
                imageURL: new URL('./static/featured-content-grid.png', import.meta.url),
            },
            {
                title: 'Article List From Feed',
                description: 'A list of articles from a feed',
                imageURL: new URL('./static/featured-link-list.png', import.meta.url),
            },
            {
                title: 'Article Selection',
                description: 'A list of articles with a selection',
                imageURL: new URL('./static/featured-quote.png', import.meta.url),
            },
            {
                title: 'Guide List',
                description: 'A list of guides',
                imageURL: new URL('./static/featured-quotes.png', import.meta.url),
            },
            {
                title: 'Inspirational Story List',
                description: 'A list of inspirational stories',
                imageURL: new URL('./static/guide-list.png', import.meta.url),
            },
        ],
    },
    {
        title: 'Products',
        blocks: [
            {
                title: 'Door Type List',
                description: 'A list of door types',
                imageURL: new URL('./static/images.png', import.meta.url),
            },
            {
                title: 'Window Type List',
                description: 'A list of window types',
                imageURL: new URL('./static/images-with-actions.png', import.meta.url),
            },
            {
                title: 'Product Type Selection',
                description: 'A list of product types with a selection',
                imageURL: new URL('./static/inspirational-story-list.png', import.meta.url),
            },
            {
                title: 'Product Feature Grid',
                description: 'A grid of product features',
                imageURL: new URL('./static/interactive-content.png', import.meta.url),
            },
            {
                title: 'Interactive Content',
                description: 'A list of interactive content',
                imageURL: new URL(
                    './static/interactive-content-glass-function.png',
                    import.meta.url,
                ),
            },
            {
                title: 'Interactive Content Glass Function',
                description: 'A list of interactive content glass functions',
                imageURL: new URL('./static/interactive-content-glass-option.png', import.meta.url),
            },
            {
                title: 'Interactive Content Glass Option',
                description: 'A list of interactive content glass options',
                imageURL: new URL('./static/interactive-content-material.png', import.meta.url),
            },
            {
                title: 'Interactive Content Material',
                description: 'A list of interactive content materials',
                imageURL: new URL(
                    './static/interactive-content-muntin-bar-style.png',
                    import.meta.url,
                ),
            },
            {
                title: 'Interactive Content Muntin Bar Style',
                description: 'A list of interactive content muntin bar styles',
                imageURL: new URL('./static/interactive-content-profile.png', import.meta.url),
            },
            {
                title: 'Interactive Content Profile',
                description: 'A list of interactive content profiles',
                imageURL: new URL('./static/product-feature-grid.png', import.meta.url),
            },
        ],
    },
    {
        title: 'Documents',
        blocks: [
            {
                title: 'Document Group Block',
                description: 'A block of document groups',
                imageURL: new URL('./static/product-type-selection.png', import.meta.url),
            },
            {
                title: 'Document Group List',
                description: 'A list of document groups',
                imageURL: new URL('./static/search-box.png', import.meta.url),
            },
            {
                title: 'Document List',
                description: 'A list of documents',
                imageURL: new URL('./static/shared-content-reference.png', import.meta.url),
            },
        ],
    },
    {
        title: 'Dealers',
        blocks: [
            {
                title: 'Dealer List',
                description: 'A list of dealers',
                imageURL: new URL('./static/tabbed-content.png', import.meta.url),
            },
            {
                title: 'Dealer Map',
                description: 'A map of dealers',
                imageURL: new URL('./static/table.png', import.meta.url),
            },
            {
                title: 'Dealer Selection',
                description: 'A list of dealers with a selection',
                imageURL: new URL('./static/vacancy-list.png', import.meta.url),
            },
        ],
    },
    {
        title: 'People and positions',
        blocks: [
            {
                title: 'Contact Person List',
                description: 'A list of contact persons',
                imageURL: new URL('./static/window-type-list.png', import.meta.url),
            },
            {
                title: 'Contact Person Selection',
                description: 'A list of contact persons with a selection',
                imageURL: new URL('./static/you-tube-video.png', import.meta.url),
            },
            {
                title: 'Vacancy List',
                description: 'A list of vacancies',
                imageURL: new URL('./static/you-tube-video-selection.png', import.meta.url),
            },
        ],
    },
];

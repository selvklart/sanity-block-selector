import {SearchResults} from '../../src/components/search-results';
import type {Group} from '../../src/types.d';
import {mockGroups} from '../mock';

const SearchResultsFixture = (groups: Group[], filter: string, onClick: () => void) => {
    return <SearchResults groups={groups} filter={filter} onClick={onClick} />;
};

export default {
    'empty search': SearchResultsFixture(mockGroups, '', () => {}),
    'no results': SearchResultsFixture(mockGroups, 'missing', () => {}),
    'single result': SearchResultsFixture(mockGroups, 'table', () => {}),
    '"feature" results': SearchResultsFixture(mockGroups, 'feature', () => {}),
    '"featured" results': SearchResultsFixture(mockGroups, 'featured', () => {}),
};

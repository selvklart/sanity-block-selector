import type {Dispatch, SetStateAction} from 'react';

import {Search} from '../../src/components/search';

interface Props {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const SearchFixture = ({value, onChange}: Props) => {
    return <Search value={value} onChange={onChange} />;
};

export default SearchFixture({value: '', onChange: () => {}});

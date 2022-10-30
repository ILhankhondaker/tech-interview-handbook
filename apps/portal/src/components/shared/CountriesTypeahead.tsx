import { useState } from 'react';
import type { TypeaheadOption } from '@tih/ui';
import { Typeahead } from '@tih/ui';

import { trpc } from '~/utils/trpc';

type Props = Readonly<{
  disabled?: boolean;
  errorMessage?: string;
  isLabelHidden?: boolean;
  onSelect: (option: TypeaheadOption | null) => void;
  placeholder?: string;
  required?: boolean;
  value?: TypeaheadOption | null;
}>;

export default function CountriesTypeahead({
  disabled,
  onSelect,
  isLabelHidden,
  placeholder,
  required,
  value,
}: Props) {
  const [query, setQuery] = useState('');
  const countries = trpc.useQuery([
    'locations.countries.list',
    {
      name: query,
    },
  ]);

  const { data } = countries;

  return (
    <Typeahead
      disabled={disabled}
      isLabelHidden={isLabelHidden}
      label="Country"
      noResultsMessage="No countries found"
      nullable={true}
      options={
        data?.map(({ id, name }) => ({
          id,
          label: name,
          value: id,
        })) ?? []
      }
      placeholder={placeholder}
      required={required}
      textSize="inherit"
      value={value}
      onQueryChange={setQuery}
      onSelect={onSelect}
    />
  );
}

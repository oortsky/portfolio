import { m } from "@/paraglide/messages.js";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { SearchIcon } from "lucide-react";

type ContentFiltersProps = {
  search: string;
  category: string;
  sort: string;

  categories: string[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: "newest" | "oldest" | "a-z" | "z-a") => void;
};

export function ContentFilters({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange
}: ContentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <InputGroup>
        <InputGroupInput
          placeholder={m["content_filters.field.search.placeholder"]()}
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <Select
        value={category}
        onValueChange={e => onCategoryChange(e.target.value)}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={m["content_filters.field.category.placeholder"]()}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={sort}
        onValueChange={e =>
          onSortChange(e.target.value as "newest" | "oldest" | "a-z" | "z-a")
        }
      >
        <SelectTrigger>
          <SelectValue
            placeholder={m["content_filters.field.sort.placeholder"]()}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">
              {m["content_filters.field.sort.value.newest"]()}
            </SelectItem>
            <SelectItem value="oldest">
              {m["content_filters.field.sort.value.oldest"]()}
            </SelectItem>
            <SelectItem value="a-z">
              {m["content_filters.field.sort.value.asce"]()}
            </SelectItem>
            <SelectItem value="z-a">
              {m["content_filters.field.sort.value.desc"]()}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

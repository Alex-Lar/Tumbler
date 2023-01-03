import Identifier from "./types/identifier";
import Tag from "./types/tag";

interface Searchable {
    id: Identifier | null;
    tag: Tag;
    includes: number[];
    excludes: number[];
}

export default Searchable;
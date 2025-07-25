import Search from "./Sortings/Search.jsx";
import Filter from "./Sortings/Filter.jsx";
import Sort from "./Sortings/Sort.jsx";

export default function Sortings({
  filter,
  setFilter,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  onReset,
}) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-md mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        <Search onSearch={setSearchQuery} value={searchQuery} onReset={onReset} />
        <Filter onSetFilter={setFilter} value={filter} onReset={onReset} />
        <Sort onSetSortOption={setSortOption} value={sortOption} onReset={onReset} />
      </div>
    </div>
  );
}

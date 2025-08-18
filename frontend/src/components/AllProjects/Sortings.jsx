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
  showSeach,
}) {
  return (
    <div className={`${showSeach ? "block" : "hidden"} sm:block`}>
      <div className="glass rounded-2xl p-3 sm:p-8 shadow-lg border border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row gap-6 max-sm:gap-3">
          <Search onSearch={setSearchQuery} value={searchQuery} onReset={onReset} />
          <Filter onSetFilter={setFilter} value={filter} onReset={onReset} />
          <Sort onSetSortOption={setSortOption} value={sortOption} onReset={onReset} />
        </div>
      </div>
    </div>
  );
}

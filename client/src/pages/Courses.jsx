import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../components/loadingContext";

const SearchBar = lazy(() => import("../components/SearchBar"));
const CardBody = lazy(() => import("../components/CardBody"));

const Courses = () => {
  const { fetchCoursesData, coursesData, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");
  const { setIsLoading } = useLoading();

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCoursesData();
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const uniqueCategories = [
      ...new Set(coursesData.map((course) => course.course_category)),
    ];
    setCategories(uniqueCategories);
    setIsLoading(false);
  }, [coursesData]);

  // Fetch user's watchlist
  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/user/watchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlist(data.watchlist || []);
      } else {
        console.error(
          "Failed to fetch watchlist:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [API, token]);

  const updateWatchlist = useCallback(() => {
    fetchWatchlist();
  }, []);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return coursesData.filter(
      (course) =>
        (selectedCategory
          ? course.course_category === selectedCategory
          : true) &&
        (course.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.creator_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [coursesData, selectedCategory, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const handleCategorySelect = useCallback((category) => {
    setCurrentPage(1);
    if (category === "All") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className={`relative min-h-screen-minus-nav p-6 overflow-hidden z-10 ${
        isDark ? "bg-dark-bg-primary" : "bg-light-bg-primary"
      }`}
    >
      {/* Background */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      ></div>

      <div className="relative z-20 max-w-7xl mx-auto">
        <h2
          className={`w-full text-center text-4xl font-black font-righteous tracking-wider mb-8 ${
            isDark ? "text-dark-text-primary" : "text-light-text-primary"
          }`}
        >
          {selectedCategory || "All Courses"}
        </h2>

        {/* SearchBar */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-12 mb-6">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Suspense>

        {/* Categories */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-10 sticky top-[85px] bg-opacity-80 backdrop-blur-sm py-4 z-30
            ${isDark ? "bg-dark-bg-primary" : "bg-light-bg-primary"}`}
        >
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === null
                  ? `bg-primary text-white`
                  : `${
                      isDark
                        ? "bg-dark-bg-tertiary text-dark-text-primary hover:bg-dark-bg-secondary"
                        : "bg-light-bg-tertiary text-light-text-primary hover:bg-light-bg-secondary"
                    }`
              }`}
            onClick={() => handleCategorySelect("All")}
          >
            All
          </button>

          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? `bg-primary text-white`
                    : `${
                        isDark
                          ? "bg-dark-bg-tertiary text-dark-text-primary hover:bg-dark-bg-secondary"
                          : "bg-light-bg-tertiary text-light-text-primary hover:bg-light-bg-secondary"
                      }`
                }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div key={course._id}>
                <Suspense
                  fallback={
                    <div className="w-[300px] h-[400px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  }
                >
                  <CardBody
                    course={course}
                    watchlist={watchlist}
                    updateWatchlist={updateWatchlist}
                  />
                </Suspense>
              </div>
            ))
          ) : (
            <div
              className={`w-[300px] border rounded-md overflow-hidden shadow-md
              ${
                isDark
                  ? "bg-dark-bg-secondary border-dark-border"
                  : "bg-light-bg-secondary border-light-border"
              }`}
            >
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544961.jpg"
                alt="No Course Found"
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4">
                <h3
                  className={`text-lg font-medium ${
                    isDark
                      ? "text-dark-text-primary"
                      : "text-light-text-primary"
                  }`}
                >
                  No Courses Found{" "}
                  {selectedCategory ? `in ${selectedCategory}` : ""}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {/* Prev */}
            <button
              className="px-3 py-1 rounded bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:hover:bg-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-1 text-white font-bold">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-primary-dark text-white"
                      : "bg-primary hover:bg-primary-dark"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              className="px-3 py-1 rounded bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:hover:bg-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

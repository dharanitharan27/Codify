// src/components/Courses.jsx
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

// Lazy loaded components
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

  useEffect(() => {
    setIsLoading(true);
    fetchCoursesData();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    // Extract unique categories from coursesData
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
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlist(data.watchlist || []); // Set to an empty array if watchlist is undefined
        //console.log("Watchlist data is ", data.watchlist || []);
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
    fetchWatchlist(); // Fetch the watchlist when component mounts
  }, [API, token]);

  // Handle watchlist update in CardBody - memoized to prevent unnecessary re-renders
  const updateWatchlist = useCallback(() => {
    fetchWatchlist(); // Re-fetch watchlist to get the latest data
  }, []);

  // Filter courses based on selected category and search term - memoized for performance
  const filteredCourses = useMemo(() => {
    //console.log('Recalculating filtered courses');
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

  // Memoized category selection handler
  const handleCategorySelect = useCallback((category) => {
    if (category === "All") {
      setSelectedCategory(null); // Reset to show all courses
    } else {
      setSelectedCategory(category);
    }
  }, []);

  return (
    <div
      className={`relative min-h-screen-minus-nav p-6 overflow-hidden z-10 ${
        isDark ? "bg-dark-bg-primary" : "bg-light-bg-primary"
      }`}
    >
      {/* Background with gradient */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      ></div>

      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <h2
          className={`w-full text-center text-4xl font-black font-righteous tracking-wider mb-8 ${
            isDark ? "text-dark-text-primary" : "text-light-text-primary"
          }`}
        >
          {selectedCategory || "All Courses"}
        </h2>

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
          className="flex flex-wrap justify-center gap-3 mb-10 sticky top-[85px] bg-opacity-80 backdrop-blur-sm py-4 z-30
          ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[400px]">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
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
            <div className="col-span-full flex justify-center items-center min-h-[400px]">
              <div
                className={`w-[300px] border rounded-md overflow-hidden shadow-md
              ${
                isDark
                  ? "bg-dark-bg-secondary border-dark-border"
                  : "bg-light-bg-secondary border-light-border"
              }`}
              >
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544961.jpg?t=st=1729403294~exp=1729406894~hmac=ec87d355b9eaf1e9d5530b62be453b683494fbbe2bfe9cbde000ce01fe8e1037&w=1060"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

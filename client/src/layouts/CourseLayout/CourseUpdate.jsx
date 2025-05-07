import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import CourseForm from "./CourseForm";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardBody from "../../components/CardBody";
import { useLoading } from "../../components/loadingContext";
import { useTheme } from "../../context/ThemeContext";
import { FaArrowLeft, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";

const CourseUpdate = () => {
    const { setIsLoading } = useLoading();
    const [preview, setPreview] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [newCourse, setNewCourse] = useState({
        course_title: "",
        course_category: "",
        course_image: "",
        creator_name: "",
        creator_image: "",
        creator_youtube_link: "",
        description: ""
    });
    const { id } = useParams();
    const { API, authorizationToken } = useAuth();

    const getOneCourse = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/admin/courses/getcourse/${id}`, {
                headers: { Authorization: authorizationToken },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }

            const data = await response.json();
            setNewCourse(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch course data");
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        setNewCourse({...newCourse, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/admin/courses/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(newCourse),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message || "Course updated successfully");
                navigate("/admin/courses");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update course");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating the course");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getOneCourse();
    }, []);

    return (
        <div className="p-6">
            {/* Header with breadcrumb */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm mb-2">
                    <span
                        className={`cursor-pointer hover:text-primary ${
                            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                        }`}
                        onClick={() => navigate("/admin/courses")}
                    >
                        Courses
                    </span>
                    <span className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                        /
                    </span>
                    <span className="text-primary">Edit Course</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl font-righteous flex items-center gap-2">
                        <MdVideoLibrary className="text-primary" />
                        <span className={isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}>
                            Edit Course:
                        </span>
                        <span className="text-primary truncate max-w-md">
                            {newCourse.course_title || "Loading..."}
                        </span>
                    </h2>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/admin/courses")}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                                ${isDark
                                    ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary'
                                    : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                                }
                            `}
                        >
                            <FaArrowLeft />
                            <span>Back to Courses</span>
                        </button>

                        <button
                            onClick={() => setPreview(!preview)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                                ${isDark
                                    ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary'
                                    : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                                }
                            `}
                        >
                            {preview ? <FaEyeSlash /> : <FaEye />}
                            <span>{preview ? "Hide Preview" : "Show Preview"}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${
                    isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'
                }`}>
                    <div className={`mb-4 pb-4 border-b border-dashed flex items-center gap-2 ${
                        isDark ? 'border-dark-border' : 'border-light-border'
                    }`}>
                        <FaEdit className="text-primary" />
                        <h3 className={`text-xl font-medium ${
                            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                        }`}>
                            Course Details
                        </h3>
                    </div>

                    <CourseForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        newCourse={newCourse}
                        isDark={isDark}
                        isUpdate={true}
                    />
                </div>

                {/* Preview */}
                <div className={`${preview ? 'block' : 'hidden lg:block'} lg:col-span-1`}>
                    <div className={`sticky top-24 p-6 rounded-xl shadow-lg ${
                        isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'
                    }`}>
                        <div className={`mb-4 pb-4 border-b border-dashed flex items-center gap-2 ${
                            isDark ? 'border-dark-border' : 'border-light-border'
                        }`}>
                            <FaEye className="text-primary" />
                            <h3 className={`text-xl font-medium ${
                                isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                            }`}>
                                Preview
                            </h3>
                        </div>

                        <div className="overflow-hidden rounded-lg">
                            <CardBody course={newCourse} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseUpdate;

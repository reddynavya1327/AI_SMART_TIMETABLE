const API_BASE_URL = "http://localhost:8080";


// =========================================================
// AUTHENTICATION
// =========================================================

export async function loginStudent(email, password) {

    const response = await fetch(
        `${API_BASE_URL}/api/students/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Invalid email or password"
        );
    }

    return data;
}


// =========================================================
// REGISTRATION
// =========================================================

export async function registerStudent(student) {

    const response = await fetch(
        `${API_BASE_URL}/api/students/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Registration failed"
        );
    }

    return data;
}


// =========================================================
// STUDENTS
// =========================================================

export async function getStudents() {

    const response = await fetch(
        `${API_BASE_URL}/api/students`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch students"
        );
    }

    return response.json();
}


export async function getStudentById(studentId) {

    const response = await fetch(
        `${API_BASE_URL}/api/students/${studentId}`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch student"
        );
    }

    return response.json();
}


// =========================================================
// SUBJECTS
// =========================================================

export async function getStudentSubjects(studentId) {

    const response = await fetch(
        `${API_BASE_URL}/api/students/${studentId}/subjects`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch subjects"
        );
    }

    return response.json();
}


export async function addSubject(
    studentId,
    subject
) {

    const response = await fetch(
        `${API_BASE_URL}/api/students/${studentId}/subjects`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(subject)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to add subject"
        );
    }

    return data;
}


export async function deleteSubject(
    studentId,
    subjectId
) {

    const response = await fetch(
        `${API_BASE_URL}/api/students/${studentId}/subjects/${subjectId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {

        throw new Error(
            "Failed to delete subject"
        );
    }

    return true;
}


// =========================================================
// TIMETABLE
// =========================================================

export async function getStudentTimetable(studentId) {

    const response = await fetch(
        `${API_BASE_URL}/api/timetable/${studentId}`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch timetable"
        );
    }

    return response.json();
}


export async function generateTimetable(studentId) {

    const response = await fetch(
        `${API_BASE_URL}/api/timetable/generate/${studentId}`,
        {
            method: "POST"
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to generate timetable"
        );
    }

    return data;
}


// =========================================================
// AI
// =========================================================

export async function getAiScore(subjectId) {

    const response = await fetch(
        `${API_BASE_URL}/api/ai/subjects/${subjectId}/score`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch AI score"
        );
    }

    return response.json();
}


// =========================================================
// PERFORMANCE
// =========================================================

export async function getStudentPerformance(studentId) {

    const response = await fetch(
        `${API_BASE_URL}/api/performance/students/${studentId}`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch performance"
        );
    }

    return response.json();
}


export async function getSubjectPerformance(subjectId) {

    const response = await fetch(
        `${API_BASE_URL}/api/performance/subjects/${subjectId}`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to fetch subject performance"
        );
    }

    return response.json();
}


export async function recordPerformance(
    studentId,
    subjectId,
    performance
) {

    const response = await fetch(
        `${API_BASE_URL}/api/performance/students/${studentId}/subjects/${subjectId}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(performance)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to save performance"
        );
    }

    return data;
}
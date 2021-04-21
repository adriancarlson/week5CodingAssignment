// 1.	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
// a.	Use at least one array.
// b.	Use at least two classes.
// c.	Your menu should have the options to create, view, and delete elements.

class Student {
	constructor(firstName, lastName, gradeLevel) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gradeLevel = gradeLevel;
	}

	describe() {
		return `${this.firstName} ${this.lastName} has a grade level of ${this.gradeLevel}`;
	}
}

class Course {
	constructor(courseName) {
		this.courseName = courseName;
		this.students = [];
	}

	addStudent(student) {
		if (student instanceof Student) {
			this.students.push(student);
		} else {
			throw new Error(`You can only add an instance of Student. Argument is not a Student: ${student}`);
		}
	}

	describe() {
		return `${this.courseName} has ${this.students.length} students.`;
	}
}

class Menu {
	constructor() {
		this.courses = [];
		this.selectedCourse = null;
	}

	start() {
		let selection = this.showMainMenuOptions();
		while (selection != 0) {
			switch (selection) {
				case '1':
					this.createCourse();
					break;
				case '2':
					this.viewCourse();
					break;
				case '3':
					this.deleteCourse();
					break;
				case '4':
					this.displayCourses();
					break;
				default:
					selection = 0;
			}
			selection = this.showMainMenuOptions();
		}
		alert(`See ya Later!`);
	}
	showMainMenuOptions() {
		return prompt(`
		0) Exit
		1) Create New Course 
		2) View Course
		3) Delete Course 
		4) Display All Courses
		`);
	}

	showCourseMenuOptions(courseInfo) {
		return prompt(`
		0) Back 
		1) Create Student 
		2) Delete Student 
		________________
		${courseInfo}
		`);
	}
	createCourse() {
		let courseName = prompt(`Please enter name for new course:`);
		this.courses.push(new Course(courseName));
	}

	viewCourse() {
		let index = prompt(`Enter the index of the course you wish to view:`);
		if (index > -1 && index < this.courses.length) {
			this.selectedCourse = this.courses[index];
			let description = 'Course Name: ' + this.selectedCourse.courseName + '\n';

			for (let i = 0; i < this.selectedCourse.students.length; i++) {
				description += i + ') ' + this.selectedCourse.students[i].firstName + ' ' + this.selectedCourse.students[i].lastName + ' - ' + this.selectedCourse.students[i].gradeLevel + '\n';
			}

			let selection = this.showCourseMenuOptions(description);
			switch (selection) {
				case '1':
					this.createStudent();
					break;
				case '2':
					this.deleteStudent();
			}
		}
	}

	deleteCourse() {
		let index = prompt(`Enter the index of the course you wish to remove:`);
		if (index > -1 && index < this.courses.length) {
			this.courses.splice(index, 1);
		}
	}

	displayCourses() {
		let courseString = ``;
		for (let i = 0; i < this.courses.length; i++) {
			courseString += i + ') ' + this.courses[i].courseName + '\n';
		}
		alert(courseString);
	}

	createStudent() {
		let firstName = prompt(`Enter student first name: `);
		let lastName = prompt(`Enter student last name: `);
		let gradeLevel = prompt(`Enter student grade level: `);
		this.selectedCourse.students.push(new Student(firstName, lastName, gradeLevel));
	}

	deleteStudent() {
		let index = prompt(`Enter the index of the student you wish to remove:`);
		if (index > -1 && index < this.selectedCourse.students.length) {
			this.selectedCourse.students.splice(index, 1);
		}
	}
}

let menu = new Menu();
menu.start();

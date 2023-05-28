const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};
function getScore(score) {
	let gradationKeys = Object.keys(gradation);
	for (let i = 0; i < gradationKeys.length; i++) {
		if (score >= 0 && score <= gradationKeys[i]) {
			return gradation[gradationKeys[i]];
		}
		if (score <= gradationKeys[i] && score > gradationKeys[i - 1]) {
			return gradation[gradationKeys[i]];
		}
	}
}

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];



class User {
	constructor(user) {
		this.name = user.name;
		this.age = user.age;
		this.img = user.img;
		this.role = user.role;
		this.courses = user.courses;
	}
	render() {
		return `<div class="user">
					<div class="user__info">
						<div class="user__info--data">
							<img src="./images/users/${this.img}.png" alt="">
							<div class="user__naming">
								<p>Name: ${this.name}</p>
								<p>Age: ${this.age}</p>
							</div>
						</div>
						<div class="user__info--role">
							<img src="./images/roles/${this.role}.png">
							<p>${this.role.charAt(0).toUpperCase() + this.role.slice(1)}</p>
						</div>
					</div>
				</div>`
	}
	renderCourses() {
		let tempRender = `<div class="courses">`;
		for (let index = 0; index < this.courses.length; index++) {
			tempRender += `<div class="courses__info">
							<div class="mark">
								<p>${this.courses[index].title}</p>
								<div class="mark__score"><p>${getScore(this.courses[index].mark)}</p></div>
							</div>
						</div>`;
		}
		tempRender += `</div>`
		return `${tempRender}`;
	}
	showUser() {
		document.write(`<div class="user__card">${this.render()}</div>`);
	}
	showUserCourses() {
		document.write(`<div class="user__card">${this.render()}${this.renderCourses()}</div>`);

	}
}


class Admin extends User {
	renderCourses() {
		let tempRender = `<div class="courses">`;
		for (let index = 0; index < this.courses.length; index++) {
			tempRender += `<div class="courses__info">
							<p>Title: <b>${this.courses[index].title}</b></p>
							<div class="mark">
								<p>Admin's score:</p>
								<div class="mark__score"><p>${getScore(this.courses[index].score)}</p></div>
							</div>
							<p>Lector: <b>${this.courses[index].lector}</b></p>
						</div>`;
		}
		tempRender += `</div>`
		return `${tempRender}`;
	}
}
class Lector extends User {
	renderCourses() {
		let tempRender = `<div class="courses">`;
		for (let index = 0; index < this.courses.length; index++) {
			tempRender += `<div class="courses__info">
							<p>Title: <b>${this.courses[index].title}</b></p>
							<div class="mark">
								<p>Lector's score:</p>
								<div class="mark__score"><p>${getScore(this.courses[index].score)}</p></div>
							</div>
							<div class="mark">
								<p>Average student's score:</p>
								<div class="mark__score"><p>${getScore(this.courses[index].studentsScore)}</p></div>
							</div>
						</div>`;
		}
		tempRender += `</div>`
		return `${tempRender}`;
	}
}


let usersRender = users.map(person => {
	if (person.role === "student") {
		return new User(person);
	} else if (person.role === "admin") {
		return new Admin(person);
	} else if (person.role === "lector") {
		return new Lector(person);
	}
})
console.log(usersRender);

for (let index = 0; index < usersRender.length; index++) {
	if (typeof (usersRender[index].courses) == "undefined") {
		usersRender[index].showUser();
	} else {
		usersRender[index].showUserCourses();
	}
}
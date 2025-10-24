const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable');

document.addEventListener('DOMContentLoaded', loadStudents);
studentForm.addEventListener('submit', addStudent);

function addStudent(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const course = document.getElementById('course').value.trim();
  const age = document.getElementById('age').value.trim();

  if (!name || !course || !age) return;

  const student = { name, course, age };
  const students = getStudents();
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  studentForm.reset();
  displayStudents();
}

function getStudents() {
  return JSON.parse(localStorage.getItem('students')) || [];
}

function displayStudents() {
  const students = getStudents();
  studentTable.innerHTML = '';

  students.forEach((s, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.course}</td>
      <td>${s.age}</td>
      <td><button class="deleteBtn" onclick="deleteStudent(${index})">Delete</button></td>
    `;
    studentTable.appendChild(row);
  });
}

function deleteStudent(index) {
  const students = getStudents();
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}

function loadStudents() {
  displayStudents();
}
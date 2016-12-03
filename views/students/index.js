extends ../layout

block content
    h1.
         #{title}
    ul
        - each student, i in students
            li
                = student.name
                = student.badge
                = student.dob
                = student.isloved
                = student._id
                form(action='/students/#{student._id}/edit',method='post',enctype='application/x-www-form-urlencoded')
                    input(type='hidden',value='DELETE',name='_method')
                    button(type='submit').
                        Delete
                p 
                    a(href='/students/#{student._id}/edit') Edit
                p
                    a(href='/students/#{student._id}') Show

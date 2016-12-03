extends ../layout

block content
    h1.
        #{title}
    form#formAddStudent(name="addstudent",method="post",action="/students")
        p Name: 
            input#inputName(type="text", placeholder="ex. John Smith", name="name")
        p Badge:
            input#inputBadge(type="number", placeholder="ex. 123456", name="badge")
        p DOB: 
            input#inputDob(type="date", name="dob")
        p
            button#btnSubmit(type="submit") submit
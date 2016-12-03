extends ../layout

block content
    h1.
        Infophoto #{student._id}
    p Name: #{student.name}
    p Bactch: #{student.batch}
    p Doa: #{studentdoa}
    p Is Loved: #{student.isloved}
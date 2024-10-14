import { NextRequest, NextResponse } from 'next/server';
import user from '../../../../public/users/user.json';

export const GET = async (req : NextRequest) => {
    const { searchParams } = new URL(req.url);
    let filteredUsers = [...user];


    const name = searchParams.get('name');
    if (name) {
        filteredUsers = filteredUsers.filter(person =>
            person.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    const city = searchParams.get('city');
    if (city === 'New York') {
        filteredUsers = filteredUsers.filter(person => person.city === 'New York');
    }

    const age = searchParams.get('age');
    if (age) {
        filteredUsers = filteredUsers.filter(person => person.age >= parseInt(age, 10));
    }

    if (filteredUsers.length === 0) {
        return NextResponse.json(
            { message: 'No users found with the specified criteria.' },
            { status: 404 }
        );
    }

    return NextResponse.json(filteredUsers);

};


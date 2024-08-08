import React from 'react';
import { useParams } from 'react-router-dom';
import './TeamMember.css'; // Import the CSS file

const members = {
  guy: {
    name: "Guy Pariente",
    hobbies: "Football, Basketball",
    courses: "Electronic commerce, Information retrieval",
    email: "guy.pariente@e.braude.ac.il"
  },
  tomer: {
    name: "Tomer Lazarovitch",
    hobbies: "Football, Tennis, Crossfit",
    courses: "Geometric Deep Learning, Information retrieval",
    email: "tomer.lazarovitch@e.braude.ac.il"
  },
  itamar: {
    name: "Itamar Kraus",
    hobbies: "Football, Tennis",
    courses: "Electronic commerce, Information retrieval",
    email: "itamar.kraus@e.braude.ac.il"
  },
  chay: {
    name: "Chay Fadida",
    hobbies: "UFC, Gaming",
    courses: "Information retrieval, Data Security and Cryptology",
    email: "Yechezkel.chay.Fadid@e.braude.ac.il"
  }
};

const TeamMember = () => {
  const { memberId } = useParams();
  const member = members[memberId];

  if (!member) {
    return <p>Member not found</p>;
  }

  return (
    <section className="team-member">
      <h2>{member.name}</h2>
      <p><strong>Hobbies:</strong> {member.hobbies}</p>
      <p><strong>Courses:</strong> {member.courses}</p>
      <p><strong>Email:</strong> <a href={`mailto:${member.email}`}>{member.email}</a></p>
    </section>
  );
};

export default TeamMember;

import Image from 'next/image';

interface AuthorCardProps {
  name: string;
  description: string;
  photo?: string;
  email?: string;
}

export default function AuthorCard({ name, description, photo, email }: AuthorCardProps) {
  return (
    <div className="author-card">
      <div className="author-card-content">
        {photo && (
          <div className="author-card-photo">
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="author-card-name">{name}</h4>
          <p className="author-card-description">{description}</p>
          {email && (
            <p className="author-card-description mt-2">
              <a href={`mailto:${email}`} className="text-primary hover:underline">
                {email}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export const FormTextarea = ({ label, name, ...props }: { label: string, name: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">{label}</label>
      <div className="mt-1">
        <textarea id={name} name={name} {...props} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
      </div>
    </div>
)

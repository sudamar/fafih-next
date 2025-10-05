export const RadioOption = ({ name, value, label, ...props }: { name: string, value: string, label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <label className="flex items-center space-x-2 text-sm text-gray-800">
        <input type="radio" name={name} value={value} {...props} className="h-4 w-4 text-primary focus:ring-primary" />
        <span>{label}</span>
    </label>
)

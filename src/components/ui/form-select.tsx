export const FormSelect = ({ label, name, options, ...props }: { label: string, name: string, options: {value: string, label: string}[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-800">{label}</label>
        <div className="mt-1">
            <select id={name} name={name} {...props} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                <option value="">Selecione...</option>
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)
                }
            </select>
        </div>
    </div>
)

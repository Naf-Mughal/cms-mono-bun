export const ReadonlyList = ({ data, depth = 1 }: { data: any, depth?: number }) => {
    if (Array.isArray(data?.children)) {
        data?.children?.forEach((item: any, index: number) => {
            if (Array.isArray(item?.children?.value)) {
                return <ReadonlyList key={index} data={item?.children} depth={(depth + 1) % 3} />
            }
        })
    }
    return <ol className={`space-y-1 my-2 text-black`} style={{ paddingRight: `${depth * 0.25}rem` }} dir="rtl" lang="ar-sa">
        {data?.value?.map((item: any, index: number) => {
            const Number = depth === 2 ? (index + 1).toLocaleString('ar-EG') : index + 1;
            return (
                <li key={index}>
                    <div className="flex items-center">
                        <span className="ml-2">{depth > 2 ? <div className="h-1 w-1 rounded-full bg-black"></div> : Number + '.'}</span> {item}
                    </div>
                    {
                        data?.children?.[index]?.children?.value?.length > 0 && <ReadonlyList data={data?.children?.[index]?.children} depth={(depth + 1) as 1 | 2 | 3} />
                    }
                </li>
            );
        })}
    </ol>
};
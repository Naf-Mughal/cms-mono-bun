import { useState, useCallback } from 'react';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';

// Constants
const NUMBERING_DEPTH = 2;
const BULLET_SIZE = 'h-1 w-1';
const ARABIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

// Type Definitions
interface ListData {
    value?: string[];
    children?: { value?: string; children?: ListData }[];
}

interface ListProps {
    data: ListData;
    onChange: (data: ListData) => void;
    depth?: 1 | 2 | 3;
}

// Map depth to Tailwind padding classes
const getPaddingClass = (depth: number): string => {
    const paddingMap: { [key: number]: string } = {
        1: 'pr-4', // 1rem
        2: 'pr-8', // 2rem
        3: 'pr-12', // 3rem
    };
    return paddingMap[depth] || 'pr-4'; // Fallback to pr-4
};

export const List = ({ data, onChange, depth = 1 }: ListProps) => {
    // State
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [addingIndex, setAddingIndex] = useState<number | null>(null);
    const [addValue, setAddValue] = useState<string>('');
    const [isAddingTopLevel, setIsAddingTopLevel] = useState(false);
    const [topLevelAddValue, setTopLevelAddValue] = useState<string>('');

    // Memoized Handlers
    const handleEdit = useCallback((index: number, value: string) => {
        setEditingIndex(index);
        setEditValue(value);
    }, []);

    const handleEditConfirm = useCallback(
        (index: number) => {
            const newValue = [...(data?.value || [])];
            newValue[index] = editValue;
            onChange({
                ...data,
                value: newValue,
            });
            setEditingIndex(null);
            setEditValue('');
        },
        [data, editValue, onChange]
    );

    const handleEditCancel = useCallback(() => {
        setEditingIndex(null);
        setEditValue('');
    }, []);

    const handleAdd = useCallback((index: number) => {
        setAddingIndex(index);
        setAddValue('');
    }, []);

    const handleAddConfirm = useCallback(
        (index: number) => {
            const newChildren = data?.children?.[index]?.children
                ? {
                    ...data.children[index].children,
                    value: [...(data.children[index].children.value || []), addValue],
                    children: data.children[index].children.children || [],
                }
                : { value: [addValue], children: [] };
            const newChildrenArray = [...(data?.children || [])];
            newChildrenArray[index] = {
                ...newChildrenArray[index],
                children: newChildren,
            };
            onChange({
                ...data,
                children: newChildrenArray,
            });
            setAddingIndex(null);
            setAddValue('');
        },
        [data, addValue, onChange]
    );

    const handleAddCancel = useCallback(() => {
        setAddingIndex(null);
        setAddValue('');
    }, []);

    const handleDeleteWhole = useCallback(
        (index: number) => {
            const newValue = [...(data?.value || [])];
            const newChildren = [...(data?.children || [])];
            newValue.splice(index, 1);
            newChildren.splice(index, 1);
            onChange({
                ...data,
                value: newValue,
                children: newChildren,
            });
        },
        [data, onChange]
    );

    const handleTopLevelAddConfirm = useCallback(() => {
        const newValue = [...(data?.value || []), topLevelAddValue];
        const newChildren = [
            ...(data?.children || []),
            { value: topLevelAddValue, children: { value: [], children: [] } },
        ];
        onChange({
            ...data,
            value: newValue,
            children: newChildren,
        });
        setIsAddingTopLevel(false);
        setTopLevelAddValue('');
    }, [data, topLevelAddValue, onChange]);

    const handleTopLevelAddCancel = useCallback(() => {
        setIsAddingTopLevel(false);
        setTopLevelAddValue('');
    }, []);

    // Fallback for empty data
    if (!data?.value?.length) {
        return <div className="text-gray-500">لا توجد عناصر لعرضها</div>;
    }

    return (
        <div>
            <ol
                className={`${getPaddingClass(depth)} space-y-1 my-2 text-black`}
                style={{ paddingRight: `${depth * 0.25}rem` }}
                dir="rtl"
                lang="ar"
            >
                {data.value.map((item, index) => {
                    const Number =
                        depth === NUMBERING_DEPTH
                            ? (index + 1)
                                .toString()
                                .split('')
                                .map((digit) => ARABIC_NUMERALS[parseInt(digit)])
                                .join('')
                            : index + 1;
                    return (
                        <li
                            key={index}
                            className="relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={() => setHoveredIndex(index)}
                            onBlur={() => setHoveredIndex(null)}
                            tabIndex={0}
                        >
                            <div className="flex items-center justify-between group">
                                {/* Item Display or Edit Input */}
                                <div className="flex items-center">
                                    <span className="ml-2">
                                        {depth > NUMBERING_DEPTH ? (
                                            <div className={`${BULLET_SIZE} rounded-full bg-black`}></div>
                                        ) : (
                                            Number + '.'
                                        )}
                                    </span>
                                    {editingIndex === index ? (
                                        <div className="flex items-center w-full">
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-1 p-1 border rounded"
                                                dir="rtl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleEditConfirm(index)}
                                                className="mx-1 text-green-600 disabled:opacity-50"
                                                disabled={!editValue.trim()}
                                                aria-label="تأكيد التعديل"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleEditCancel}
                                                className="mx-1 text-red-600"
                                                aria-label="إلغاء التعديل"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span>{item}</span>
                                    )}
                                </div>
                                {/* Action Buttons */}
                                {hoveredIndex === index && editingIndex !== index && addingIndex !== index && (
                                    <div className="hidden group-hover:flex group-focus:flex space-x-2 w-max">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(index, item)}
                                            className="text-blue-600"
                                            aria-label="تعديل العنصر"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAdd(index)}
                                            className="text-green-600"
                                            aria-label="إضافة عنصر"
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteWhole(index)}
                                            className="text-red-600"
                                            aria-label="حذف العنصر"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Add New Item Input */}
                            {addingIndex === index && (
                                <div className="flex items-center mt-2 mr-4">
                                    <input
                                        type="text"
                                        value={addValue}
                                        onChange={(e) => setAddValue(e.target.value)}
                                        className="flex-1 p-1 border rounded"
                                        dir="rtl"
                                        placeholder="أدخل العنصر الجديد"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleAddConfirm(index)}
                                        className="mx-1 text-green-600 disabled:opacity-50"
                                        disabled={!addValue.trim()}
                                        aria-label="تأكيد الإضافة"
                                    >
                                        <Check size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddCancel}
                                        className="mx-1 text-red-600"
                                        aria-label="إلغاء الإضافة"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            {/* Recursive Nested List */}
                            {data?.children?.[index]?.children &&
                                data.children[index].children.value &&
                                data.children[index].children.value.length > 0 && (
                                    <List
                                        key={`nested-${index}`}
                                        data={data.children[index].children}
                                        onChange={(newChildData: ListData) => {
                                            const newChildren = [...(data?.children || [])];
                                            newChildren[index] = {
                                                ...newChildren[index],
                                                children: newChildData,
                                            };
                                            onChange({
                                                ...data,
                                                children: newChildren,
                                            });
                                        }}
                                        depth={(depth + 1) as 1 | 2 | 3}
                                    />
                                )}
                        </li>
                    );
                })}
            </ol>
            {/* Top-Level Add */}
            {depth === 1 && (
                <>
                    {isAddingTopLevel ? (
                        <div className="flex items-center mt-4 mr-4">
                            <input
                                type="text"
                                value={topLevelAddValue}
                                onChange={(e) => setTopLevelAddValue(e.target.value)}
                                className="flex-1 p-1 border rounded"
                                dir="rtl"
                                placeholder="أدخل عنصرًا جديدًا في المستوى الأعلى"
                            />
                            <button
                                type="button"
                                onClick={handleTopLevelAddConfirm}
                                className="mx-1 text-green-600 disabled:opacity-50"
                                disabled={!topLevelAddValue.trim()}
                                aria-label="تأكيد الإضافة"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={handleTopLevelAddCancel}
                                className="mx-1 text-red-600"
                                aria-label="إلغاء الإضافة"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsAddingTopLevel(true)}
                            className="flex items-center mt-4 cursor-pointer text-green-600 hover:text-green-700"
                            aria-label="إضافة عنصر جديد"
                        >
                            (<span>Add More</span>)
                        </button>
                    )}
                </>
            )}
        </div>
    );
};
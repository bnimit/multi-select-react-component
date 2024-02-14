/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import styles from './multiselect.module.css';

export type SelectOption = {
    label: string
    value: string | number
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange:(value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function MultiSelect({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isOpen) setHighlightedIndex(0);
    },[isOpen])

    useEffect(() => {

    });

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if(multiple) {
            if(value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if(option !== value) onChange(option);
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple? value.includes(option) : option === value;
    }

    return(
        <div 
            ref={containerRef}
            onBlur={() => setIsOpen(false)} 
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0} 
            className={styles.container}
            >
            <span className={styles.value}>{multiple ? value.map(v => (
                <button 
                    key={v.value} 
                    onClick={e => {
                        e.stopPropagation();
                        selectOption(v)
                    }}
                    className={styles["option-badge"]}
                    >
                        {v.label}
                    </button>
            )) : value?.label}</span>
            {/* <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions()
                }} 
                className={styles['clear-btn']}>&times;</button> */}
                <div className={styles.divider}></div>
             { isOpen && <div className={styles.chevron}><i className="fa fa-chevron-up"></i></div>}
            {!isOpen && <div className={styles.chevron}><i className="fa fa-chevron-down"></i></div>}
            
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li 
                        onMouseEnter={()=>setHighlightedIndex(index)}
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                            }}
                        key={option.value} 
                        className={`${styles.option} 
                            ${isOptionSelected(option) ? styles.selected : ""}
                            ${index === highlightedIndex ? styles.highlighted : ""}
                            `}
                        >
                            {option.label}
                            <span className={`${styles.check} ${isOptionSelected(option) ? styles.selected : ""}`}><i className="fa fa-check"></i></span>
                        </li>
                ))}
            </ul>
        </div>
    )
}
import { useState } from 'react';

import styles from '../../styles/components/MainFilter.module.css';

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const MainFilterList = [
    {
        "id": "ideal_for",
        "name": "IDEAL FOR",
        "options": [
            {
                "label": "Men",
                "value": "men"
            },
            {
                "label": "Women",
                "value": "women"
            },
            {
                "label": "Baby & Kids",
                "value": "baby_kids"
            }
        ]
    },
    {
        "id": "occasion",
        "name": "OCCASION",
        "options": [
            {
                "label": "Casual",
                "value": "casual"
            },
            {
                "label": "Party",
                "value": "party"
            },
            {
                "label": "Formal",
                "value": "formal"
            }
        ]
    },
    {
        "id": "work",
        "name": "WORK",
        "options": [
            {
                "label": "Office",
                "value": "office"
            },
            {
                "label": "Work from Home",
                "value": "wfh"
            },
            {
                "label": "Field Work",
                "value": "field_work"
            }
        ]
    },
    {
        "id": "fabric",
        "name": "FABRIC",
        "options": [
            {
                "label": "Cotton",
                "value": "cotton"
            },
            {
                "label": "Polyester",
                "value": "polyester"
            },
            {
                "label": "Denim",
                "value": "denim"
            }
        ]
    },
    {
        "id": "segment",
        "name": "SEGMENT",
        "options": [
            {
                "label": "Jewelery",
                "value": "jewelery"
            },
            {
                "label": "Electronics",
                "value": "electronics"
            },
            {
                "label": "Accessories",
                "value": "accessories"
            }
        ]
    },
    {
        "id": "suitable_for",
        "name": "SUITABLE FOR",
        "options": [
            {
                "label": "Summers",
                "value": "summers"
            },
            {
                "label": "Winters",
                "value": "winters"
            },
            {
                "label": "All Seasons",
                "value": "all_seasons"
            }
        ]
    },
    {
        "id": "raw_materials",
        "name": "RAW MATERIALS",
        "options": [
            {
                "label": "Organic",
                "value": "organic"
            },
            {
                "label": "Recycled",
                "value": "recycled"
            },
            {
                "label": "Natural Fibers",
                "value": "natural_fibers"
            }
        ]
    },
    {
        "id": "pattern",
        "name": "PATTERN",
        "options": [
            {
                "label": "Solid",
                "value": "solid"
            },
            {
                "label": "Printed",
                "value": "printed"
            },
            {
                "label": "Striped",
                "value": "striped"
            }
        ]
    }
];

const MainFilter = (props) => {
    const { selectedFilters, setSelectedFilters } = props;

    const [openSections, setOpenSections] = useState({});

    // Toggle individual filter sections
    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = (sectionId, optionValue) => {
        setSelectedFilters(prev => {
            const sectionFilters = prev[sectionId] || [];
            const isSelected = sectionFilters.includes(optionValue);

            return {
                ...prev,
                [sectionId]: isSelected
                    ? sectionFilters.filter(item => item !== optionValue)
                    : [...sectionFilters, optionValue]
            };
        });
    };

    // Unselect all options in a section
    const unselectAll = (sectionId) => {
        setSelectedFilters(prev => ({
            ...prev,
            [sectionId]: []
        }));
    };

    // Get display text for selected filters
    const getSelectedText = (sectionId) => {
        const selected = selectedFilters[sectionId] || [];
        if (selected.length === 0) return "All";
        if (selected.length === 1) {
            const option = MainFilterList.find(section => section.id === sectionId)
                ?.options.find(opt => opt.value === selected[0]);
            return option ? option.label : "All";
        }
        return `${selected.length} selected`;
    };

    return (
        <div className={styles.mainFilterSidebar}>
            

            <h3>Filters</h3>
            {MainFilterList.map((section) => {
                const isOpen = openSections[section.id];
                const sectionFilters = selectedFilters[section.id] || [];

                return (
                    <div key={section.id} className={styles.mainFilterSection}>
                        <div className={styles.mainFilterTitle}>
                            <h4>{section.name}</h4>
                            <button
                                onClick={() => toggleSection(section.id)}
                                className={styles.mainFilterIconBtn}
                                aria-label={`Toggle ${section.name} filter`}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? (
                                    <MdKeyboardArrowUp className={styles.mainFilterIcon} />
                                ) : (
                                    <MdKeyboardArrowDown className={styles.mainFilterIcon} />
                                )}
                            </button>
                        </div>

                        <p className={styles.filterValue}>{getSelectedText(section.id)}</p>

                        <div className={`${styles.mainFilterOptions} ${isOpen ? styles.mainFilterOptionsOpen : ''}`}>
                            {sectionFilters.length > 0 && (
                                <button
                                    onClick={() => unselectAll(section.id)}
                                    className={styles.mainUnselectAll}
                                >
                                    Unselect all
                                </button>
                            )}
                            {section.options.map((option) => (
                                <label
                                    key={option.value}
                                    className={styles.mainFilterCheckboxLabel}
                                    htmlFor={`${section.id}-${option.value}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`${section.id}-${option.value}`}
                                        checked={sectionFilters.includes(option.value)}
                                        onChange={() => handleCheckboxChange(section.id, option.value)}
                                        aria-describedby={`${section.id}-description`}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MainFilter;
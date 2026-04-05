import React, { useState } from 'react';
import { Button, Popover, Space } from 'antd';
import { RedoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface AiButtonHeaderProps {
    label: string;
    onGenerate: () => Promise<string | null>;
    onApply: (text: string) => void;
    isLoading: boolean;
    isDisabled: boolean;
    buttonText?: string;
    loadingText?: string;
    icon?: React.ReactNode;
    required?: boolean;
}

const AiButtonHeader: React.FC<AiButtonHeaderProps> = ({
    label,
    onGenerate,
    onApply,
    isLoading,
    isDisabled,
    buttonText = 'Магия AI',
    loadingText = 'Генерирую...',
    icon,
    required = false
}) => {
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    const handleInternalGenerate = async () => {
        const text = await onGenerate();
        if (text) {
            setAiResult(text);
            setVisible(true);
        }
    };

    const handleApply = () => {
        if (aiResult) {
            onApply(aiResult);
            setVisible(false);
            setAiResult(null);
        }
    };

    const popoverContent = (
        <div style={{ maxWidth: '300px' }}>
            <div style={{ 
                marginBottom: '12px', 
                fontSize: '14px', 
                whiteSpace: 'pre-wrap',
                lineHeight: '1.4' 
            }}>
                {aiResult}
            </div>
            <Space>
                <Button 
                    type="primary" 
                    size="small" 
                    onClick={handleApply} 
                    icon={<CheckOutlined />}
                >
                    Применить
                </Button>
                <Button 
                    size="small" 
                    onClick={handleInternalGenerate} 
                    icon={<RedoOutlined />} 
                    loading={isLoading}
                >
                    Повторить
                </Button>
                <Button 
                    size="small" 
                    type="text" 
                    onClick={() => setVisible(false)} 
                    icon={<CloseOutlined />} 
                />
            </Space>
        </div>
    );

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            height: '32px',
            width: '195px',
        }}>
            <label style={{ 
                fontWeight: 'bold', 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {required && (
                    <span style={{ color: '#ff4d4f', marginRight: '4px' }}>*</span>
                )}
                {label}
            </label>

            <Popover
                content={popoverContent}
                title="Ответ AI:"
                trigger="click"
                open={visible}
                onOpenChange={setVisible}
                placement="topRight"
            >
                <Button 
                    type="default" 
                    size="small" 
                    onClick={handleInternalGenerate}
                    loading={isLoading}
                    disabled={isDisabled || isLoading}
                    style={{ 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(249, 241, 230, 1)',
                        color: 'rgba(255, 169, 64, 1)',
                        border: 'none',
                        fontWeight: 500
                    }}
                    icon={!isLoading ? <span>{icon}</span> : null}
                >
                    {isLoading ? loadingText : buttonText}
                </Button>
            </Popover>
        </div>
    );
};

export default AiButtonHeader;
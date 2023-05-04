import React from 'react'
import clsx from 'clsx'
import { SideComments } from '../components/SideComments/SideComments'


interface MainLayoutProps {
    hideComments?: boolean;
    hideMenu?: boolean;
    contentFullWidth?: boolean;
    className?: string;
    children?: any
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
    const {
        contentFullWidth,
        hideComments,
        className,
        children
    } = props

    return (
        <div className={clsx('wrapper', className)}>
            <div className={clsx('content', {'content--full': contentFullWidth})}>{children}</div>
            {!hideComments && (
                <div className="rightSide">
                    <SideComments />
                </div>
            )}
        </div>
    )
}

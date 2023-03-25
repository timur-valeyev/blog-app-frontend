import React from 'react'
import clsx from 'clsx'
import AsideMenuLeft from '../components/AsideMenuLeft'
import {SideComments} from '../components/SideComments'

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
        hideMenu,
        className,
        children
    } = props

    return (
        <div className={clsx('wrapper', className)}>
            {!hideMenu &&
                <div className="leftSide">
                    <AsideMenuLeft />
                </div>
            }
            <div className={clsx('content', {'content--full': contentFullWidth})}>{children}</div>
            {!hideComments && (
                <div className="rightSide">
                    <SideComments/>
                </div>
            )}
        </div>
    )
}

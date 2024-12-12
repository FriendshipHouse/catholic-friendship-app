'use client';

import React, { Key } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import { useTranslations } from 'next-intl';

type TreeCategoryProps = {
  pageTitle: string;
  treeData: DataNode[];
  onSelect: (keys: Key[]) => void;
  selectedKeys: Key[];
};

function TreeCategory({
  pageTitle,
  treeData,
  onSelect,
  selectedKeys,
}: Readonly<TreeCategoryProps>) {
  const t = useTranslations('');

  return (
    <div>
      <div className="min-h-[32px] w-full border-b border-gray-40 py-1 pb-4 text-lg font-semibold">
        {t(`management.${pageTitle}`)}
      </div>
      <div className="p-5">
        <Tree
          defaultExpandAll={true}
          showLine
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          blockNode
          className="[&_.ant-tree-title]:px-2 [&_.ant-tree-treenode-disabled_.ant-tree-node-content-wrapper]:!text-gray-80"
          selectedKeys={selectedKeys}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

export default TreeCategory;

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { FileStructure, FileStructureNode, FileType } from '@/models/file-structure';

interface FileTreeProps {
  nodes: FileStructureNode[];
  onSelect?: (node: FileStructureNode) => void;
  onValidate?: (node: FileStructureNode) => void;
  className?: string;
}

/**
 * File Tree Structure Component
 *
 * Displays a hierarchical file structure with support for read-only indicators,
 * validation status, and interactive navigation.
 */
export function FileTreeComponent({ nodes, onSelect, onValidate, className }: FileTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelect = (node: FileStructureNode) => {
    setSelectedNode(node.id);
    onSelect?.(node);
  };

  const renderNode = (node: FileStructureNode, level = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;
    const hasChildren = node.children.length > 0;

    const getStatusIcon = () => {
      if (node.readOnly) {
        return <Lock className="h-3 w-3 text-red-500" />;
      }
      return <Unlock className="h-3 w-3 text-green-500" />;
    };

    const getValidationIcon = () => {
      // For demo purposes, show random validation status
      const statuses = ['valid', 'warning', 'error'] as const;
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      switch (status) {
        case 'valid':
          return <CheckCircle className="h-3 w-3 text-green-500" />;
        case 'warning':
          return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
        case 'error':
          return <XCircle className="h-3 w-3 text-red-500" />;
        default:
          return null;
      }
    };

    const getNodeIcon = () => {
      if (node.type === FileType.DIRECTORY) {
        return isExpanded ? (
          <FolderOpen className="h-4 w-4 text-blue-500" />
        ) : (
          <Folder className="h-4 w-4 text-blue-500" />
        );
      }
      return <File className="h-4 w-4 text-gray-500" />;
    };

    return (
      <div key={node.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <div
          className={`
            flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-50
            ${isSelected ? 'bg-blue-50 border border-blue-200' : ''}
            ${node.readOnly ? 'opacity-75' : ''}
          `}
          onClick={() => handleSelect(node)}
        >
          {hasChildren ? (
            <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(node.id)}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          ) : (
            <div className="w-4" /> // Spacer for alignment
          )}

          {getNodeIcon()}
          <span className="flex-1 text-sm font-mono truncate">
            {node.path.split('/').pop() || node.path}
          </span>

          <div className="flex items-center space-x-1">
            {getValidationIcon()}
            {getStatusIcon()}
            <Badge
              variant={node.readOnly ? "destructive" : "default"}
              className="text-xs"
            >
              {node.type}
            </Badge>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(node.id)}>
            <CollapsibleContent>
              <div className="space-y-1">
                {node.children.map((child) => renderNode(child, level + 1))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  };

  const readOnlyCount = nodes.filter(node => node.readOnly).length;
  const directoryCount = nodes.filter(node => node.type === FileType.DIRECTORY).length;
  const fileCount = nodes.filter(node => node.type === FileType.FILE).length;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-blue-600" />
            <span>File Structure</span>
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {directoryCount} dirs
            </Badge>
            <Badge variant="outline" className="text-xs">
              {fileCount} files
            </Badge>
            {readOnlyCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {readOnlyCount} read-only
              </Badge>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Project file structure with read-only indicators and validation status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-1">
            {nodes.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No files found</p>
              </div>
            ) : (
              nodes.map((node) => renderNode(node))
            )}
          </div>
        </ScrollArea>

        {selectedNode && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Selected:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              {(() => {
                const node = findNodeById(nodes, selectedNode);
                if (!node) return null;

                return (
                  <>
                    <div><strong>Path:</strong> {node.path}</div>
                    <div><strong>Type:</strong> {node.type}</div>
                    <div><strong>Status:</strong> {node.readOnly ? 'Read-only' : 'Writable'}</div>
                    <div><strong>Description:</strong> {node.description}</div>
                    <div><strong>Depth:</strong> {node.depth}</div>
                    {node.children.length > 0 && (
                      <div><strong>Children:</strong> {node.children.length}</div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Legend:</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Valid</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span>Warning</span>
              </div>
              <div className="flex items-center space-x-1">
                <XCircle className="h-3 w-3 text-red-500" />
                <span>Error</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3 text-red-500" />
                <span>Read-only</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to find node by ID
function findNodeById(nodes: FileStructureNode[], id: string): FileStructureNode | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}
import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-example.css'],
})
export class CdkDragDropConnectedSortingExample {
  jobs = [
    {
      jobId: 0,
      jobName: 'Free Positions',
      isDummy: false,
      isPosChanged: false,
      positions: [
        {
          name: 'ArbeitPosition',
          positionId: 0,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
        {
          name: 'paket1',
          positionId: 1,
          type: 'pkt',
          paketInfo: 'paket1',
          parentPaketId: 0,
        },
        {
          name: 'paket1 Position 1',
          positionId: 2,
          type: 'pktpos',
          parentPaketId: 1,
          paketInfo: 'paket1',
        },
        {
          name: 'paket1 Position 2',
          positionId: 3,
          type: 'pktpos',
          parentPaketId: 1,
          paketInfo: 'paket1',
        },
        {
          name: 'Spare part',
          positionId: 4,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
        {
          name: 'Outside position',
          positionId: 5,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
        {
          name: 'Paket2',
          positionId: 6,
          type: 'pkt',
          paketInfo: 'Paket2',
          parentPaketId: 0,
        },
        {
          name: 'Paket 2 Position1',
          positionId: 7,
          type: 'pktpos',
          parentPaketId: 6,
          paketInfo: 'Paket2',
        },
        {
          name: 'Paket 2 Position2',
          positionId: 8,
          type: 'pktpos',
          parentPaketId: 6,
          paketInfo: 'Paket2',
        },
        {
          name: 'Position 8',
          positionId: 9,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
      ],
    },
  ];

  indicesWithNonEmptyPaketInfo: number[] = [];
  drop(event: CdkDragDrop<Position[]>) {
    if (event.previousContainer === event.container) {
      if (event.item.data.type == 'pkt') {
        if (event.item.data.name === event.item.data.paketInfo) {
          this.indicesWithNonEmptyPaketInfo = this.getIndexValue(
            event.container.data
          );
          const isValid = this.isValidMove(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
          // down
          if (event.previousIndex > event.currentIndex) {
            //  console.log(event.previousContainer.data);
            for (let i = 0; i <= 2; i++) {
              // console.log(
              //   'i am here',
              //   event.previousIndex + i,
              //   event.currentIndex + i
              // );
              if (isValid) {
                moveItemInArray(
                  event.container.data,
                  event.previousIndex + i,
                  event.currentIndex + i
                );
              }
            }
          } else {
            // up
            for (let i = 0; i <= 2; i++) {
              if (isValid) {
                moveItemInArray(
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex
                );
              }
            }
          }
        }
      } else {
        this.indicesWithNonEmptyPaketInfo = this.getIndexValue(
          event.container.data
        );
        const isValid = this.isValidMove(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        if (isValid) {
          moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );

          // Use the map function to update the positions array for the specified job
          this.indicesWithNonEmptyPaketInfo = this.getIndexValue(
            event.container.data
          );
        }
      }
    } else {
      // console.log(event.previousIndex);
      // console.log(event.currentIndex);
      // const isValid = this.isValidJobMove(
      //   event.previousContainer.data,
      //   event.previousIndex,
      //   event.currentIndex,
      //   event.item.data
      // );

      if (event.item.data.type == 'pkt') {
        console.log(event.container.data);
        for (let i = 0; i <= 2; i++) {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );

          event.container.data.sort((a, b) => a.positionId - b.positionId);
        }
        // const sortByPositionId = (a:any, b:any) => a.positionId - b.positionId;

        // const sort = [...event.container.data].sort(sortByPositionId);
        // event.container.data=sort;
      } else {
        const isValid = this.isValidJobMove(
          event.container.data,
          event.previousIndex,
          event.currentIndex,
          event.item.data
        );
        if (isValid) {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      }
    }
    // console.log('All Jobs', this.jobs);
  }

  dragStarted(event: any): void {
    if (event.source.data.type !== 'pkt') return;
    let childs: any = document.getElementsByClassName(
      `parent-pos-${event.source.data.positionId}`
    );
    for (let i = 0; i < childs.length; i++) {
      childs[i]['style']['border'] = '2px solid green';
    }
  }

  dragReleased(event: any): void {
    if (event.source.data.type !== 'pkt') return;
    setTimeout(() => {
      let childs: any = document.getElementsByClassName(
        `parent-pos-${event.source.data.positionId}`
      );
      for (let i = 0; i < childs.length; i++) {
        childs[i]['style']['border'] = '1px solid #ccc';
      }
    }, 2000);
  }

  dropJobs(event: any) {
    const isValid = this.isValidMove(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    if (event.previousContainer === event.container) {
      if (isValid) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      if (isValid) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  AddJObs(event: any) {
    let count = this.jobs.length;
    this.jobs.unshift({
      jobId: count,
      jobName: event.name,
      positions: [],
      isDummy: event.isDummy,
      isPosChanged: false,
    });
  }

  sortPredicate(index: number, item: CdkDrag<Position>) {
    // console.log('evenPredicate Index ', index, 'item ', item.data);
    return true;
  }

  onDeleteJob(jobId: number) {
    // Update jobId to -1 for jobs with non-empty positions
    this.jobs.forEach((job) => {
      if (job.positions.length > 0) {
        if (job.jobId === jobId) {
          job.jobId = -1;
        } else {
          const jobToDelete = this.jobs.find((j) => j.jobId === jobId);

          if (jobToDelete) {
            // Find or create the job with jobId 0
            const jobWithId0 = this.jobs.find((j) => j.jobId === 0) || {
              jobId: 0,
              jobName: 'Free Positions',
              isDummy: false,
              isPosChanged: false,
              positions: [],
            };

            // Move positions from the job to delete to the job with jobId 0
            jobWithId0.positions.push(...jobToDelete.positions);

            // Remove the job with the specified jobId
            this.jobs = this.jobs.filter((j) => j.jobId !== jobId);

            // Log the updated jobs array
            console.log(this.jobs);
          } else {
            // Handle the case where no job with the specified jobId is found
            console.log(`Job with jobId ${jobId} not found`);
          }
        }
      }
    });
  }

  isValidMove(arr: any, currentIndex: number, targetIndex: number) {
    // Extract types and additional information from the current and target positions
    const currentType = arr[currentIndex].type;
    const targetType = arr[targetIndex].type;
    const currPaketInfo = arr[currentIndex].paketInfo;
    const targetPacketInfo = arr[targetIndex].paketInfo;
    const targetParentPaketId = arr[targetIndex].parentPaketId;

    // Adjust the target index based on its type ('pkt' or 'pktpos')
    let target = targetIndex;
    if (targetType === 'pkt' || targetType === 'pktpos') {
      target = targetIndex + 1;
    } else {
      target = targetIndex;
    }

    // Check if the move is within the bounds of the array
    if (
      currentIndex < 0 ||
      currentIndex >= arr.length ||
      targetIndex < 0 ||
      targetIndex >= arr.length
    ) {
      console.log('Invalid move: Index out of bounds');
      return false;
    }

    // Check conditions for invalid moves

    // Condition: Moving a 'pos' to a forward 'pkt' position is not allowed
    if (
      targetIndex > currentIndex &&
      targetType === 'pkt' &&
      currentType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition: Moving a 'pos' to a backward 'pkt' position is allowed
    if (
      targetIndex < currentIndex &&
      targetType === 'pkt' &&
      currentType === 'pos'
    ) {
      return true;
    }

    // Condition 1: Moving backward into a 'pkt' position or 'pktpos'
    if (
      (currentIndex > targetIndex &&
        currentType === 'pos' &&
        targetType === 'pkt') ||
      targetType === 'pktpos'
    ) {
      // Get the last index of the target type with the same parent paket ID
      const lastIndex = this.findLastElementIndex(
        arr,
        targetType,
        targetParentPaketId
      );

      // Allow the move only if it's the last index and types match
      if (
        lastIndex === targetIndex &&
        currentIndex < targetIndex &&
        currentType !== targetType
      ) {
        return true;
      }

      // Check if types match, allowing the move; otherwise, show an alert
      if (currentType === targetType && currPaketInfo === targetPacketInfo) {
        return true;
      } else {
        this.showInvalidMoveAlert();
        return false;
      }
    }

    // Condition 2: Moving backward into a 'pktpos' position from a 'pktpos' is not allowed
    if (
      currentIndex > targetIndex &&
      currentType === 'pktpos' &&
      targetType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition 3: Moving forward into a 'pkt' position or from 'pktpos' to 'pos'
    if (
      (currentIndex < targetIndex && currentType === 'pkt') ||
      (currentType === 'pktpos' && targetType === 'pos')
    ) {
      // Check if types match, allowing the move; otherwise, show an alert
      if (currentType === 'pkt' && targetType === 'pos') {
        return true;
      } else {
        this.showInvalidMoveAlert();
        return false;
      }
    } else {
      // Perform the desired action when the condition is not met

      // Allow the move if types are the same
      if (currentType === targetType) {
        return true;
      }

      // Check if the target position is occupied and has a type other than 'pos'
      if (
        this.indicesWithNonEmptyPaketInfo.includes(target) &&
        targetType !== 'pos'
      ) {
        this.showInvalidMoveAlert();
        return false;
      }

      // If none of the invalid conditions are met, the move is valid
      return true;
    }
  }

  isValidJobMove(
    arr: any[],
    prevIndex: number,
    currentIndex: number,
    item: any
  ): boolean {
    // condition: Check if the move is valid if the array is empty and the item type is not 'pktpos'
    if (arr.length === 0 && item.type !== 'pktpos') {
      return true;
    }
    // condition: Check if the move is invalid if the array is empty and the item type is 'pktpos'
    if (arr.length === 0 && item.type === 'pktpos') {
      this.showInvalidMoveAlert();
      return false;
    }
    const movedItemType = item.type;
    let targetIndex = currentIndex - 1;
    targetIndex = targetIndex === -1 ? 0 : targetIndex;
    const targetType = arr[targetIndex].type;
    const targetParentPaketId = arr[targetIndex].parentPaketId;

    // Condition: Moving a 'pos' to a forward 'pkt' position is not allowed
    if (
      targetIndex > currentIndex &&
      targetType === 'pkt' &&
      movedItemType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition: Moving a 'pos' to a backward 'pkt' position is allowed
    if (
      targetIndex < currentIndex &&
      targetType === 'pkt' &&
      movedItemType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition 1: Moving backward into a 'pkt' position or 'pktpos'
    if (
      (currentIndex > targetIndex &&
        movedItemType === 'pos' &&
        targetType === 'pkt') ||
      targetType === 'pktpos'
    ) {
      // Get the last index of the target type with the same parent paket ID
      const lastIndex = this.findLastElementIndex(
        arr,
        targetType,
        targetParentPaketId
      );

      // Allow the move only if it's the last index and types match
      if (lastIndex === targetIndex && movedItemType !== targetType) {
        return true;
      }
    }

    // Condition 2: Moving backward into a 'pktpos' position from a 'pktpos' is not allowed
    if (
      currentIndex > targetIndex &&
      movedItemType === 'pktpos' &&
      targetType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition 3: Moving forward into a 'pkt' position or from 'pktpos' to 'pos'
    if (
      (currentIndex < targetIndex && movedItemType === 'pkt') ||
      (movedItemType === 'pktpos' && targetType === 'pos')
    ) {
      // Check if types match, allowing the move; otherwise, show an alert
      if (movedItemType === 'pkt' && targetType === 'pos') {
        return true;
      } else {
        this.showInvalidMoveAlert();
        return false;
      }
    } else {
      if (targetType === 'pkt' && targetIndex === 0) {
        return true;
      }
      // Allow the move if types are the same
      if (
        currentIndex > targetIndex &&
        movedItemType === 'pos' &&
        targetType === 'pos'
      ) {
        return true;
      }
      // Allow the move if types are the same
      if (currentIndex > targetIndex || movedItemType !== targetType) {
        this.showInvalidMoveAlert();
        return false;
      }

      if (movedItemType === targetType) {
        return true;
      }

      // Additional condition: Moving a 'pos' backward into a 'pktpos' position is allowed only at the top or bottom
      if (currentIndex > targetIndex && targetType === 'pktpos') {
        if (movedItemType === 'pos') {
          // Check if it is at the bottom or top
          if (currentIndex === 0 || currentIndex === arr.length) {
            return true;
          } else {
            this.showInvalidMoveAlert();
            return false;
          }
        }
      }
      // If none of the invalid conditions are met, the move is valid
      return true;
    }
  }

  // Function to get indices of elements with a specific type

  getIndices(arr: any[], targetType: string): number[] {
    const indices: number[] = [];
    arr.forEach((item: any, index: number) => {
      if (item.type === targetType) {
        indices.push(index);
      }
    });
    return indices;
  }

  // Function to find the last element index
  findLastElementIndex(
    arr: any,
    currentType: string,
    targetParentPaketId: number
  ) {
    // Filter out items where positionId === parentPaketId
    const filteredData = arr.filter(
      (item: any) =>
        item.parentPaketId === targetParentPaketId && item.type === currentType
    );
    // Get the index of the last item in the original array
    const lastIndex = arr.lastIndexOf(filteredData[filteredData.length - 1]);

    // Get the last index of the filtered array
    return lastIndex;
  }

  // // Function to show an alert for an invalid move
  showInvalidMoveAlert() {
    alert(
      'Invalid move: Cannot move inside or between positions with type "pkt" or "pktpos".'
    );
  }

  moveItem(arr: any, currentIndex: number, targetIndex: number) {
    // Check if the move is valid
    if (!this.isValidMove(arr, currentIndex, targetIndex)) {
      return arr; // Return the original array if the move is invalid
    }

    // Perform the move
    const itemToMove = arr.splice(currentIndex, 1)[0];
    arr.splice(targetIndex, 0, itemToMove);

    return arr;
  }
  getIndexValue(arrObj: any) {
    return arrObj
      .filter(
        (item: Position) =>
          item.paketInfo !== '' &&
          item.type !== 'pkt' &&
          item.parentPaketId !== 0
      )
      .map((item: Position) => arrObj.indexOf(item));
  }
}

export interface Position {
  name: string;
  positionId: number;
  parentPaketId: number;
  type: string;
  paketInfo: string;
}

export interface Job {
  jobName: string;
  jobId: number;
  positions?: Position[];
}
/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */

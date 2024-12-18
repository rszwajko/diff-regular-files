# diff-regular-files README

Sample extension to re-create problem reported in [234097](https://github.com/microsoft/vscode/issues/234097)

Steps to re-create:
1. in Explorer View chose a file item and select "Select for Compare" action
2. chose a different file and select "Compare with Selected"
3. chose non-inline diff view - a new context action is available "Apply Block" (left arrow)
4. use the action to edit a file on the left side
5. results: 
   * a new duplicated editor is opened
   * the diff editor is not marked as dirty

![Screencast](screencast/steps.mp4)

**Enjoy!**
